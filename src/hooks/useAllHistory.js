import { useState, useCallback } from 'react';

/**
 * 获取所有用户历史记录的 Hook（管理员专用）
 */
export function useAllHistory() {
    const [allHistory, setAllHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllHistory = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/history/all');
            if (!response.ok) {
                throw new Error('Failed to fetch all history');
            }

            const data = await response.json();
            setAllHistory(data.history || []);
        } catch (err) {
            console.error('Error fetching all history:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        allHistory,
        loading,
        error,
        fetchAllHistory
    };
}
