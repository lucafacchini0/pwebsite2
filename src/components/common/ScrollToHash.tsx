import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToHash = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // If there is a hash, scroll to it
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        } else {
            // If no hash, we usually want to scroll to top when changing pages
            // But we must check if we are already at top or if it's just a query param change? 
            // Usually simply scrolling to top on route change is good practice.
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
};
