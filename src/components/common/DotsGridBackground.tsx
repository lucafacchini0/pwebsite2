import React from 'react';

interface DotsGridBackgroundProps {
    color?: string;
    gap?: number;
    radius?: number;
    className?: string;
}

export const DotsGridBackground: React.FC<DotsGridBackgroundProps> = ({
    color = '#E4E4E7', // zinc-200
    gap = 24,
    radius = 1.5,
    className = ''
}) => {
    return (
        <div
            className={`absolute inset-0 h-full w-full pointer-events-none z-0 dark:opacity-20 transition-opacity duration-200 ${className}`}
            style={{
                backgroundImage: `radial-gradient(circle, ${color} ${radius}px, transparent ${radius}px)`,
                backgroundSize: `${gap}px ${gap}px`
            }}
            aria-hidden="true"
        />
    );
};
