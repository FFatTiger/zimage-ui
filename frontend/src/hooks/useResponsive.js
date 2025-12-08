import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking responsive state
 * @param {number} breakpoint - window width breakpoint (default: 1024)
 * @returns {boolean} - true if window width is below breakpoint
 */
export function useResponsive(breakpoint = 1024) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return isMobile;
}
