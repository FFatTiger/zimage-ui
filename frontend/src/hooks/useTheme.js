import { useState, useEffect } from 'react';

/**
 * Custom hook for managing dark mode theme
 * @returns {[isDarkMode, toggleDarkMode]} - dark mode state and toggle function
 */
export function useTheme() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Initialize dark mode from localStorage
    useEffect(() => {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(darkMode);
        if (darkMode) {
            document.documentElement.classList.add('dark');
        }
    }, []);

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
