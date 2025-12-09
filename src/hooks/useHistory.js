import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing generation history
 * 现在优先使用服务器端存储
 * @returns {Object} - history state and management functions
 */
export function useHistory(username) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * 从服务器加载历史记录
     */
    const loadFromServer = useCallback(async () => {
        if (!username) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/history?username=${encodeURIComponent(username)}`);
            if (response.ok) {
                const data = await response.json();
                setHistory(data.history || []);
            }
        } catch (e) {
            console.error('Failed to load history from server:', e);
            // 降级到 localStorage
            loadFromLocalStorage();
        } finally {
            setLoading(false);
        }
    }, [username]);

    /**
     * 从 localStorage 加载（降级方案）
     */
    const loadFromLocalStorage = useCallback(() => {
        const storedHistory = localStorage.getItem('comfyui_history');
        if (storedHistory) {
            try {
                setHistory(JSON.parse(storedHistory));
            } catch (e) {
                console.error('Failed to load history from localStorage:', e);
            }
        }
    }, []);

    // 初始加载
    useEffect(() => {
        loadFromServer();
    }, [loadFromServer]);

    /**
     * 添加历史记录
     */
    const addToHistory = useCallback(async (item) => {
        if (!username) {
            console.warn('No username available');
            return;
        }

        // 立即更新本地状态
        setHistory(prev => [item, ...prev]);

        // 同步到服务器
        try {
            await fetch('/api/history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, item })
            });
        } catch (e) {
            console.error('Failed to sync history to server:', e);
            // 降级保存到 localStorage
            const current = [...history, item];
            localStorage.setItem('comfyui_history', JSON.stringify(current));
        }
    }, [username, history]);

    /**
     * 删除历史记录
     */
    const deleteHistoryItem = useCallback(async (id) => {
        if (!username) return;

        // 立即更新本地状态
        setHistory(prev => prev.filter(item => item.id !== id));

        // 同步到服务器
        try {
            await fetch(`/api/history?id=${encodeURIComponent(id)}&username=${encodeURIComponent(username)}`, {
                method: 'DELETE'
            });
        } catch (e) {
            console.error('Failed to delete history from server:', e);
        }
    }, [username]);

    /**
     * 清空历史记录
     */
    const clearHistory = useCallback(async () => {
        setHistory([]);
        localStorage.removeItem('comfyui_history');
        // TODO: 可以添加服务器端清空 API
    }, []);

    /**
     * 重新加载历史记录
     */
    const reloadHistory = useCallback(() => {
        loadFromServer();
    }, [loadFromServer]);

    return {
        history,
        loading,
        addToHistory,
        deleteHistoryItem,
        clearHistory,
        reloadHistory
    };
}
