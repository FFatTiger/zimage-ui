import { useState, useEffect } from 'react';

/**
 * Custom hook for managing dark mode theme
 * Supports auto-detection of system dark mode preference
 * @returns {[isDarkMode, toggleDarkMode]} - dark mode state and toggle function
 */
export function useTheme() {
    // Check if user has manually set a preference
    const [userPreference, setUserPreference] = useState(() => {
        return localStorage.getItem('darkModePreference'); // 'dark', 'light', or null (auto)
    });

    // Get system preference
    const getSystemPreference = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    // Determine initial dark mode state
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (userPreference === 'dark') return true;
        if (userPreference === 'light') return false;
        // Auto: follow system
        return getSystemPreference();
    });

    // Listen to system theme changes
    useEffect(() => {
        // Only listen if user hasn't set a manual preference
        if (userPreference !== null) return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e) => {
            setIsDarkMode(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [userPreference]);

    // Apply theme on mount and when state changes
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const newValue = !prev;
            // Save user preference
            const preference = newValue ? 'dark' : 'light';
            localStorage.setItem('darkModePreference', preference);
            setUserPreference(preference);

            if (newValue) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return newValue;
        });
    };

    return [isDarkMode, toggleDarkMode];
}
