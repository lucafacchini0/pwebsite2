import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
    className?: string; // Allow additional classes if needed
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
    return (
        <div className={`max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 w-full ${className}`}>
            {children}
        </div>
    );
};
