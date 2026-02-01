import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    icon?: ReactNode;
}

export const Button = ({
    className,
    variant = 'primary',
    size = 'md',
    icon,
    children,
    ...props
}: ButtonProps) => {
    const variants = {
        // Primary: Strong, dark, authoritative but not loud
        primary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm border border-transparent',
        // Secondary: Muted, blends in
        secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm',
        // Outline: Similar to secondary but used for less emphasis
        outline: 'bg-transparent border border-slate-200 text-slate-600 hover:bg-slate-50',
        // Ghost: Lowest priority, for icon-only or text links
        ghost: 'bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
    };

    const sizes = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-4 text-sm', // Slightly shorter for tighter UI
        lg: 'h-10 px-6 text-base'
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {icon && <span className="mr-2 opacity-70 group-hover:opacity-100">{icon}</span>}
            {children}
        </button>
    );
};
