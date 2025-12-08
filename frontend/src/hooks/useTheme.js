import { useState, useEffect } from 'react';

/**
 * Custom hook for managing dark mode theme
 * @returns {[isDarkMode, toggleDarkMode]} - dark mode state and toggle function
 */
export function useTheme() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

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
            localStorage.setItem('darkMode', newValue.toString());
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
