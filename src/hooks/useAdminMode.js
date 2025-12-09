import { useState, useEffect } from 'react';

/**
 * 管理员模式检测 Hook
 * 检查当前路径是否为管理员路径
 */
export function useAdminMode() {
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminMode = async () => {
            try {
                // 获取配置中的管理员路径
                const response = await fetch('/api/config');
                const config = await response.json();
                const adminPath = config.ADMIN_PATH || '/admin';

                // 检查当前路径
                const currentPath = window.location.pathname;
                setIsAdminMode(currentPath === adminPath);
            } catch (error) {
                console.error('Failed to check admin mode:', error);
                setIsAdminMode(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminMode();
    }, []);

    return { isAdminMode, loading };
}
