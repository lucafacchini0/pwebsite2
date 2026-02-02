import React from 'react';

interface DotsGridBackgroundProps {
    color?: string;
    gap?: number;
    radius?: number;
    className?: string;
}

export const DotsGridBackground: React.FC<DotsGridBackgroundProps> = ({
    color = '#e2e8f0', // slate-200
    gap = 24,
    radius = 1.5,
    className = ''
}) => {
    return (
        <div
            className={`absolute inset-0 h-full w-full pointer-events-none -z-10 ${className}`}
            style={{
                backgroundImage: `radial-gradient(circle, ${color} ${radius}px, transparent ${radius}px)`,
                backgroundSize: `${gap}px ${gap}px`
            }}
            aria-hidden="true"
        />
    );
};
