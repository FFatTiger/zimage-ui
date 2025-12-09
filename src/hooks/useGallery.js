import { useState, useEffect } from 'react';

/**
 * Custom hook for managing gallery
 * @returns {Object} - gallery state and management functions
 */
export function useGallery() {
    const [gallery, setGallery] = useState([]);

    const fetchGallery = async () => {
        try {
            const response = await fetch('/api/gallery');
            if (response.ok) {
                const data = await response.json();
                setGallery(data.items || []);
            }
        } catch (error) {
            console.error('Failed to fetch gallery:', error);
        }
    };

    const shareToGallery = async (historyItem, username, t) => {
        try {
            const response = await fetch('/api/gallery/share', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    historyId: historyItem.id, // Explicitly send history ID
                    id: historyItem.id, // Fallback/Legacy ID
                    username: username || 'Anonymous',
                    prompt: historyItem.prompt,
                    negative_prompt: historyItem.negative_prompt,
                    imageUrl: historyItem.imageUrl,
                    params: historyItem.params,
                    timestamp: new Date().toISOString(),
                    timeTaken: historyItem.timeTaken
                })
            });

            if (response.ok) {
                await fetchGallery();
                if (t) {
                    alert(t('messages.sharedSuccess'));
                }
                return true;
            } else {
                if (t) {
                    alert(t('messages.shareFailed'));
                }
                return false;
            }
        } catch (error) {
            console.error('Failed to share to gallery:', error);
            if (t) {
                alert(t('messages.shareFailed'));
            }
            return false;
        }
    };

    // Load gallery on mount
    useEffect(() => {
        fetchGallery();
    }, []);

    const deleteFromGallery = async (id, t) => {
        if (!confirm(t ? t('messages.confirmDelete') : 'Are you sure you want to delete this item?')) {
            return false;
        }

        try {
            const response = await fetch(`/api/gallery/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchGallery();
                return true;
            } else {
                console.error('Failed to delete gallery item');
                return false;
            }
        } catch (error) {
            console.error('Error deleting gallery item:', error);
            return false;
        }
    };

    return {
        gallery,
        fetchGallery,
        shareToGallery,
        deleteFromGallery
    };
}
