
import { useState, useEffect } from 'react';

/**
 * Custom hook for managing state with localStorage persistence
 * @param {string} key - localStorage key
 * @param {*} initialValue - initial value if no stored value exists
 * @returns {[value, setValue]} - state value and setter function
 */
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(initialValue);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.error(`Error loading ${key} from localStorage:`, error);
        }
    }, [key]);

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    };

    return [storedValue, setValue];
}
