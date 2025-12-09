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

        // 为常用查询创建索引
        this.db.exec(`
            CREATE INDEX IF NOT EXISTS idx_username ON history(username);
            CREATE INDEX IF NOT EXISTS idx_timestamp ON history(timestamp DESC);
            CREATE INDEX IF NOT EXISTS idx_created_at ON history(created_at DESC);
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
