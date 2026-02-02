import React from 'react';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    className = '',
    icon,
    fullWidth = false,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-105 active:scale-95 focus:ring-black dark:focus:ring-white",
        secondary: "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 focus:ring-zinc-300 dark:focus:ring-zinc-600",
        outline: "border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 active:bg-zinc-100 dark:active:bg-zinc-800 focus:ring-zinc-300 dark:focus:ring-zinc-600"
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
            {...props}
        >
            {children}
            {icon && <span className="ml-2">{icon}</span>}
        </button>
    );
};
