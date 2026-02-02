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
        primary: "bg-black text-white hover:bg-gray-800 hover:scale-105 active:scale-95 focus:ring-black",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 hover:scale-105 active:scale-95 focus:ring-gray-300",
        outline: "border border-gray-300 text-gray-700 hover:border-black hover:text-black hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-300"
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
