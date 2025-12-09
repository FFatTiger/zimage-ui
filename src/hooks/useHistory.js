import { useState, useEffect } from 'react';

/**
 * Custom hook for managing generation history
 * @returns {Object} - history state and management functions
 */
export function useHistory() {
    const [history, setHistory] = useState([]);

    // Load history from localStorage on mount
    useEffect(() => {
        const storedHistory = localStorage.getItem('comfyui_history');
        if (storedHistory) {
            try {
                setHistory(JSON.parse(storedHistory));
            } catch (e) {
                console.error('Failed to load history:', e);
            }
        }
    }, []);

    // Save history to localStorage whenever it changes
    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem('comfyui_history', JSON.stringify(history));
        }
    }, [history]);

    const addToHistory = (item) => {
        setHistory(prev => [item, ...prev]);
    };

    const deleteHistoryItem = (id) => {
        setHistory(prev => prev.filter(item => item.id !== id));
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('comfyui_history');
    };

    return {
        history,
        addToHistory,
        deleteHistoryItem,
        clearHistory
    };
}
