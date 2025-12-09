const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

class HistoryDB {
    constructor(dbPath) {
        // 优先使用环境变量，否则使用默认路径
        if (!dbPath) {
            const dbDir = process.env.DB_PATH || path.join(process.cwd(), 'data');
            dbPath = path.join(dbDir, 'history.db');
        }

        // 确保数据目录存在
        const dir = path.dirname(dbPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // 初始化数据库连接
        this.db = new Database(dbPath);
        this.db.pragma('journal_mode = WAL'); // 更好的并发性能

        // 初始化表结构
        this.initTables();

        // 执行迁移
        this.migrateGallery();
    }

    /**
     * 初始化数据库表结构
     */
    initTables() {
        // 历史记录表
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS history (
                id TEXT PRIMARY KEY,
                username TEXT NOT NULL,
                prompt TEXT NOT NULL,
                negative_prompt TEXT,
                image_url TEXT NOT NULL,
                timestamp INTEGER NOT NULL,
                time_taken REAL,
                params TEXT,
                created_at INTEGER DEFAULT (strftime('%s', 'now')),
                updated_at INTEGER DEFAULT (strftime('%s', 'now'))
            )
        `);

        // 广场/画廊表
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS gallery (
                id TEXT PRIMARY KEY,
                history_id TEXT NOT NULL,
                shared_by TEXT,
                shared_at INTEGER DEFAULT (strftime('%s', 'now')),
                FOREIGN KEY (history_id) REFERENCES history(id) ON DELETE CASCADE
            )
        `);

        // 为常用查询创建索引
        this.db.exec(`
            CREATE INDEX IF NOT EXISTS idx_username ON history(username);
            CREATE INDEX IF NOT EXISTS idx_timestamp ON history(timestamp DESC);
            CREATE INDEX IF NOT EXISTS idx_created_at ON history(created_at DESC);
            CREATE INDEX IF NOT EXISTS idx_gallery_shared_at ON gallery(shared_at DESC);
        `);

        // 同步状态表 - 用于断点续传
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS sync_status (
                username TEXT PRIMARY KEY,
                last_sync_id TEXT,
                total_items INTEGER DEFAULT 0,
                synced_items INTEGER DEFAULT 0,
                last_sync_time INTEGER,
                sync_completed INTEGER DEFAULT 0
            )
        `);

        console.log('✅ Database tables initialized');
    }

    /**
     * 添加历史记录
     */
    addHistory(item) {
        const stmt = this.db.prepare(`
            INSERT OR REPLACE INTO history 
            (id, username, prompt, negative_prompt, image_url, timestamp, time_taken, params, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, strftime('%s', 'now'))
        `);

        return stmt.run(
            item.id,
            item.username,
            item.prompt,
            item.negative_prompt || '',
            item.imageUrl,
            item.timestamp,
            item.timeTaken || 0,
            JSON.stringify(item.params || {})
        );
    }

    /**
     * 批量添加历史记录（用于从 localStorage 同步）
     */
    batchAddHistory(items) {
        const insert = this.db.prepare(`
            INSERT OR REPLACE INTO history 
            (id, username, prompt, negative_prompt, image_url, timestamp, time_taken, params, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, strftime('%s', 'now'))
        `);

        const transaction = this.db.transaction((items) => {
            for (const item of items) {
                insert.run(
                    item.id,
                    item.username,
                    item.prompt,
                    item.negative_prompt || '',
                    item.imageUrl,
                    item.timestamp,
                    item.timeTaken || 0,
                    JSON.stringify(item.params || {})
                );
            }
        });

        return transaction(items);
    }

    /**
     * 获取指定用户的历史记录
     */
    getUserHistory(username, limit = 100) {
        const stmt = this.db.prepare(`
            SELECT * FROM history 
            WHERE username = ? 
            ORDER BY timestamp DESC 
            LIMIT ?
        `);

        const rows = stmt.all(username, limit);
        return rows.map(row => ({
            id: row.id,
            username: row.username,
            prompt: row.prompt,
            negative_prompt: row.negative_prompt,
            imageUrl: row.image_url,
            timestamp: row.timestamp,
            timeTaken: row.time_taken,
            params: JSON.parse(row.params || '{}')
        }));
    }

    /**
     * 获取所有用户的历史记录（管理员功能）
     */
    getAllHistory(limit = 200) {
        const stmt = this.db.prepare(`
            SELECT * FROM history 
            ORDER BY timestamp DESC 
            LIMIT ?
        `);

        const rows = stmt.all(limit);
        return rows.map(row => ({
            id: row.id,
            username: row.username,
            prompt: row.prompt,
            negative_prompt: row.negative_prompt,
            imageUrl: row.image_url,
            timestamp: row.timestamp,
            timeTaken: row.time_taken,
            params: JSON.parse(row.params || '{}')
        }));
    }

    /**
     * 更新同步状态
     */
    updateSyncStatus(username, status) {
        const stmt = this.db.prepare(`
            INSERT OR REPLACE INTO sync_status 
            (username, last_sync_id, total_items, synced_items, last_sync_time, sync_completed)
            VALUES (?, ?, ?, ?, strftime('%s', 'now'), ?)
        `);

        return stmt.run(
            username,
            status.lastSyncId || null,
            status.totalItems || 0,
            status.syncedItems || 0,
            status.syncCompleted ? 1 : 0
        );
    }

    /**
     * 获取同步状态
     */
    getSyncStatus(username) {
        const stmt = this.db.prepare(`
            SELECT * FROM sync_status WHERE username = ?
        `);

        const row = stmt.get(username);
        if (!row) return null;

        return {
            username: row.username,
            lastSyncId: row.last_sync_id,
            totalItems: row.total_items,
            syncedItems: row.synced_items,
            lastSyncTime: row.last_sync_time,
            syncCompleted: row.sync_completed === 1
        };
    }

    /**
     * 删除历史记录
     */
    deleteHistory(id, username) {
        const stmt = this.db.prepare(`
            DELETE FROM history WHERE id = ? AND username = ?
        `);

        return stmt.run(id, username);
    }

    /**
     * 检查记录是否存在
     */
    exists(id) {
        const stmt = this.db.prepare(`
            SELECT COUNT(*) as count FROM history WHERE id = ?
        `);

        const result = stmt.get(id);
        return result.count > 0;
    }

    /**
     * 获取统计信息
     */
    getStats() {
        const totalStmt = this.db.prepare('SELECT COUNT(*) as count FROM history');
        const usersStmt = this.db.prepare('SELECT COUNT(DISTINCT username) as count FROM history');

        return {
            totalRecords: totalStmt.get().count,
            totalUsers: usersStmt.get().count
        };
    }

    /**
     * 关闭数据库连接
     */
    close() {
        this.db.close();
    }

    /**
     * 迁移旧的 gallery.json 数据
     */
    migrateGallery() {
        try {
            const galleryPath = path.join(process.cwd(), 'gallery.json');
            if (!fs.existsSync(galleryPath)) return;

            // 检查 gallery 表是否为空
            const count = this.db.prepare('SELECT COUNT(*) as count FROM gallery').get().count;
            if (count > 0) {
                // 如果表不为空，说明已经迁移过或在使用新表，暂不重复迁移
                // 也可以根据需要改为合并逻辑
                return;
            }

            console.log('Migrating gallery.json to database...');
            const galleryData = JSON.parse(fs.readFileSync(galleryPath, 'utf-8'));
            const items = galleryData.items || [];
            if (items.length === 0) return;

            const insertHistory = this.db.prepare(`
                INSERT OR IGNORE INTO history 
                (id, username, prompt, negative_prompt, image_url, timestamp, time_taken, params, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, strftime('%s', 'now'))
            `);

            const insertGallery = this.db.prepare(`
                INSERT OR IGNORE INTO gallery (id, history_id, shared_by, shared_at)
                VALUES (?, ?, ?, ?)
            `);

            const findHistoryByUrl = this.db.prepare('SELECT id FROM history WHERE image_url = ?');

            this.db.transaction(() => {
                for (const item of items) {
                    // 尝试找到对应的 history
                    let historyId = item.id; // 假设 gallery item id 也是 history id
                    let historyRecord = this.db.prepare('SELECT id FROM history WHERE id = ?').get(historyId);

                    if (!historyRecord) {
                        // 尝试通过 url 查找
                        historyRecord = findHistoryByUrl.get(item.imageUrl);
                        if (historyRecord) {
                            historyId = historyRecord.id;
                        } else {
                            // 如果都没找到，需要插入 history
                            // 注意：这里我们使用 item.id 作为 history.id，以保持一致
                            insertHistory.run(
                                item.id,
                                item.username || 'Anonymous',
                                item.prompt,
                                item.negative_prompt || '',
                                item.imageUrl,
                                item.timestamp,
                                item.timeTaken || 0,
                                JSON.stringify(item.params || {})
                            );
                        }
                    }

                    // 插入 gallery
                    // 为 gallery 条目生成一个新的 UUID 或者复用 item.id ?
                    // 现在的表结构 gallery.id 是主键。
                    // 我们可以复用 item.id 作为 gallery.id 吗？
                    // 如果我们把 history.id 设为了 item.id，那么 gallery.id 也用 item.id 可能会混淆，
                    // 但逻辑上没问题，因为是两张表。
                    // 只要 history_id 正确指向 history 表的 id 即可。
                    insertGallery.run(
                        require('crypto').randomUUID(), // 为 gallery 记录生成新 ID
                        historyId,
                        item.username || 'Anonymous',
                        new Date(item.timestamp).getTime()
                    );
                }
            })();

            console.log(`Successfully migrated ${items.length} gallery items.`);
            // 重命名文件以防重复迁移
            fs.renameSync(galleryPath, galleryPath + '.bak');

        } catch (e) {
            console.error("Error migrating gallery:", e);
        }
    }

    /**
     * 添加到画廊
     * @param {string} historyId - 关联的 history ID
     * @param {string} username - 分享者
     */
    addToGallery(historyId, username) {
        // 首先验证 historyId 是否存在
        const historyExists = this.exists(historyId);
        if (!historyExists) {
            throw new Error(`History item ${historyId} not found`);
        }

        const stmt = this.db.prepare(`
            INSERT INTO gallery(id, history_id, shared_by, shared_at)
        VALUES(?, ?, ?, ?)
            `);

        // 使用 crypto 生成 UUID
        // const { v4: uuidv4 } = require('uuid'); 
        // 注意：db.js 顶部没有引入 uuid，这里需要处理一下，或者直接用 crypto.randomUUID (Node 14.17+)
        // 我们项目依赖里有 uuid 包，可以在顶部引入，或者这里动态引入
        const id = require('crypto').randomUUID();
        const sharedAt = Date.now(); // Utilize milliseconds for consistency with migration

        return stmt.run(id, historyId, username, sharedAt);
    }

    /**
     * 获取画廊列表
     */
    getGallery(limit = 100) {
        // 联表查询
        const stmt = this.db.prepare(`
        SELECT
        g.id as gallery_id,
            g.shared_by,
            g.shared_at,
            h.*
            FROM gallery g
            JOIN history h ON g.history_id = h.id
            ORDER BY g.shared_at DESC
        LIMIT ?
            `);

        const rows = stmt.all(limit);
        return rows.map(row => ({
            id: row.gallery_id, // Gallery item ID
            history_id: row.id, // History item ID
            username: row.shared_by, // Use shared_by as the primary username for display in gallery
            prompt: row.prompt,
            negative_prompt: row.negative_prompt,
            imageUrl: row.image_url,
            timestamp: new Date(row.shared_at).toISOString(), // Use shared time
            timeTaken: row.time_taken,
            params: JSON.parse(row.params || '{}'),
            original_username: row.username // Keep track of who originally generated it
        }));
    }

    /**
     * 从画廊删除
     */
    deleteFromGallery(galleryId) {
        const stmt = this.db.prepare('DELETE FROM gallery WHERE id = ?');
        return stmt.run(galleryId);
    }
}

// 创建单例实例
let instance = null;

function getDB() {
    if (!instance) {
        instance = new HistoryDB();
    }
    return instance;
}

module.exports = { HistoryDB, getDB };
