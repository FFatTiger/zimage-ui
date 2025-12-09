import { useState, useEffect, useCallback, useRef } from 'react';

const BATCH_SIZE = 10; // 每批次同步的记录数
const SYNC_PROGRESS_KEY = 'comfyui_sync_progress';
const SYNC_COMPLETED_KEY = 'comfyui_sync_completed'; // 本地标记同步完成

/**
 * 历史记录同步 Hook
 * 支持断点续传：同步过程中刷新页面后可以继续同步
 * 防止重复同步：同步完成后打标记，避免重复同步
 */
export function useSyncHistory(username) {
    const [syncStatus, setSyncStatus] = useState({
        isSyncing: false,
        progress: 0,
        total: 0,
        synced: 0,
        completed: false,
        error: null
    });

    const syncInProgressRef = useRef(false);

    /**
     * 检查用户是否已完成同步（本地标记）
     */
    const isLocalSyncCompleted = useCallback(() => {
        try {
            const completed = localStorage.getItem(SYNC_COMPLETED_KEY);
            if (completed) {
                const users = JSON.parse(completed);
                return users.includes(username);
            }
        } catch (e) {
            console.error('Failed to check local sync status:', e);
        }
        return false;
    }, [username]);

    /**
     * 标记本地同步完成
     */
    const markLocalSyncCompleted = useCallback(() => {
        try {
            const completed = localStorage.getItem(SYNC_COMPLETED_KEY);
            let users = [];
            if (completed) {
                users = JSON.parse(completed);
            }
            if (!users.includes(username)) {
                users.push(username);
                localStorage.setItem(SYNC_COMPLETED_KEY, JSON.stringify(users));
            }
        } catch (e) {
            console.error('Failed to mark local sync completed:', e);
        }
    }, [username]);

    /**
     * 检查服务器端同步状态
     */
    const checkServerSyncStatus = useCallback(async () => {
        try {
            const response = await fetch(`/api/history/sync/status?username=${encodeURIComponent(username)}`);
            if (response.ok) {
                const data = await response.json();
                return data.status?.syncCompleted || false;
            }
        } catch (e) {
            console.error('Failed to check server sync status:', e);
        }
        return false;
    }, [username]);

    /**
     * 从 localStorage 加载同步进度
     */
    const loadSyncProgress = useCallback(() => {
        try {
            const saved = localStorage.getItem(SYNC_PROGRESS_KEY);
            if (saved) {
                const progress = JSON.parse(saved);
                if (progress.username === username && !progress.completed) {
                    return progress;
                }
            }
        } catch (e) {
            console.error('Failed to load sync progress:', e);
        }
        return null;
    }, [username]);

    /**
     * 保存同步进度到 localStorage
     */
    const saveSyncProgress = useCallback((progress) => {
        try {
            localStorage.setItem(SYNC_PROGRESS_KEY, JSON.stringify(progress));
        } catch (e) {
            console.error('Failed to save sync progress:', e);
        }
    }, []);

    /**
     * 清除同步进度
     */
    const clearSyncProgress = useCallback(() => {
        localStorage.removeItem(SYNC_PROGRESS_KEY);
    }, []);

    /**
     * 执行同步
     */
    const syncToServer = useCallback(async () => {
        if (!username || syncInProgressRef.current) {
            return;
        }

        // 1. 检查是否已完成同步（本地标记）
        if (isLocalSyncCompleted()) {
            console.log('✅ Sync already completed for this user (local flag)');
            setSyncStatus({
                isSyncing: false,
                progress: 100,
                total: 0,
                synced: 0,
                completed: true,
                error: null
            });
            return;
        }

        // 2. 检查服务器端同步状态
        const serverCompleted = await checkServerSyncStatus();
        if (serverCompleted) {
            console.log('✅ Sync already completed on server');
            markLocalSyncCompleted();
            localStorage.removeItem('comfyui_history'); // 清理本地历史
            setSyncStatus({
                isSyncing: false,
                progress: 100,
                total: 0,
                synced: 0,
                completed: true,
                error: null
            });
            return;
        }

        syncInProgressRef.current = true;
        setSyncStatus(prev => ({ ...prev, isSyncing: true, error: null }));

        try {
            // 3. 检查是否有未完成的同步
            let progress = loadSyncProgress();
            let localHistory = [];
            let startIndex = 0;

            // 4. 获取本地历史记录
            try {
                const stored = localStorage.getItem('comfyui_history');
                if (stored) {
                    localHistory = JSON.parse(stored);
                }
            } catch (e) {
                console.error('Failed to load local history:', e);
            }

            if (localHistory.length === 0) {
                // 没有需要同步的数据，标记为已完成
                console.log('✅ No local history to sync');
                markLocalSyncCompleted();
                setSyncStatus({
                    isSyncing: false,
                    progress: 100,
                    total: 0,
                    synced: 0,
                    completed: true,
                    error: null
                });
                clearSyncProgress();
                return;
            }

            // 5. 确定同步起点
            if (progress && progress.total === localHistory.length) {
                // 继续之前的同步
                startIndex = progress.synced;
                console.log(`📤 Resuming sync from index ${startIndex}/${localHistory.length}`);
            } else {
                // 开始新的同步
                progress = {
                    username,
                    total: localHistory.length,
                    synced: 0,
                    completed: false
                };
                saveSyncProgress(progress);
                console.log(`📤 Starting new sync: ${localHistory.length} items`);
            }

            setSyncStatus({
                isSyncing: true,
                progress: 0,
                total: localHistory.length,
                synced: startIndex,
                completed: false,
                error: null
            });

            // 6. 批量同步
            for (let i = startIndex; i < localHistory.length; i += BATCH_SIZE) {
                const batch = localHistory.slice(i, i + BATCH_SIZE);
                const isLastBatch = i + batch.length >= localHistory.length;

                // 发送批次到服务器
                const response = await fetch('/api/history/sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username,
                        items: batch,
                        syncStatus: {
                            totalItems: localHistory.length,
                            syncedItems: i + batch.length,
                            lastSyncId: batch[batch.length - 1].id,
                            syncCompleted: isLastBatch
                        }
                    })
                });

                if (!response.ok) {
                    throw new Error('Sync failed');
                }

                // 更新进度
                const newSynced = i + batch.length;
                const newProgress = Math.floor((newSynced / localHistory.length) * 100);

                progress.synced = newSynced;
                progress.completed = isLastBatch;
                saveSyncProgress(progress);

                setSyncStatus({
                    isSyncing: true,
                    progress: newProgress,
                    total: localHistory.length,
                    synced: newSynced,
                    completed: progress.completed,
                    error: null
                });

                console.log(`📤 Synced ${newSynced}/${localHistory.length} items (${newProgress}%)`);

                // 如果完成，清理本地数据并打标记
                if (progress.completed) {
                    localStorage.removeItem('comfyui_history');
                    clearSyncProgress();
                    markLocalSyncCompleted();
                    console.log('✅ Sync completed successfully!');
                }
            }

            setSyncStatus(prev => ({
                ...prev,
                isSyncing: false,
                completed: true
            }));

        } catch (error) {
            console.error('❌ Sync error:', error);
            setSyncStatus(prev => ({
                ...prev,
                isSyncing: false,
                error: error.message
            }));
        } finally {
            syncInProgressRef.current = false;
        }
    }, [username, loadSyncProgress, saveSyncProgress, clearSyncProgress, isLocalSyncCompleted, markLocalSyncCompleted, checkServerSyncStatus]);

    /**
     * 检查是否需要自动同步
     */
    useEffect(() => {
        if (!username) return;

        const checkAndSync = async () => {
            // 先检查是否已完成同步
            if (isLocalSyncCompleted()) {
                return;
            }

            const serverCompleted = await checkServerSyncStatus();
            if (serverCompleted) {
                markLocalSyncCompleted();
                localStorage.removeItem('comfyui_history');
                return;
            }

            // 检查是否有本地历史记录需要同步
            const localHistory = localStorage.getItem('comfyui_history');
            const progress = loadSyncProgress();

            if (localHistory || (progress && !progress.completed)) {
                // 自动开始同步
                console.log('🔄 Auto-starting sync...');
                await syncToServer();
            }
        };

        checkAndSync();
    }, [username, syncToServer, loadSyncProgress, isLocalSyncCompleted, markLocalSyncCompleted, checkServerSyncStatus]);

    return {
        syncStatus,
        syncToServer,
        clearSyncProgress
    };
}
