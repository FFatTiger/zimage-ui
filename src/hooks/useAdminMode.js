import { useState, useEffect } from 'react';

/**
 * 管理员模式检测 Hook
 * 通过用户名判断是否为管理员
 * @param {string} username - 当前用户名
 */
export function useAdminMode(username) {
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminMode = async () => {
            if (!username) {
                setIsAdminMode(false);
                setLoading(false);
                return;
            }

            try {
                // 获取配置中的管理员用户名列表
                const response = await fetch('/api/config');
                const config = await response.json();
                const adminUsernames = config.ADMIN_USERNAMES || [];

                // 检查当前用户名是否在管理员列表中
                setIsAdminMode(adminUsernames.includes(username));
            } catch (error) {
                console.error('Failed to check admin mode:', error);
                setIsAdminMode(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminMode();
    }, [username]); // 当用户名变化时重新检查

    return { isAdminMode, loading };
}
