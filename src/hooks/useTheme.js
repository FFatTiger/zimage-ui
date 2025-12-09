
import { useState, useEffect } from 'react';

/**
 * Custom hook for managing dark mode theme
 * Supports auto-detection of system dark mode preference
 * @returns {[isDarkMode, toggleDarkMode]} - dark mode state and toggle function
 */
export function useTheme() {
    // Check if user has manually set a preference
    const [userPreference, setUserPreference] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Initial load
    useEffect(() => {
        const storedPref = localStorage.getItem('darkModePreference');

        let initialMode = false;

        if (storedPref === 'dark') {
            setUserPreference('dark');
            initialMode = true;
        } else if (storedPref === 'light') {
            setUserPreference('light');
            initialMode = false;
        } else {
            // Auto
            initialMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        setIsDarkMode(initialMode);
    }, []);

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
            return newValue;
        });
    };

    return [isDarkMode, toggleDarkMode];
}
