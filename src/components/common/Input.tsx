import { type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
}

export const Input = ({ className, icon, ...props }: InputProps) => {
    return (
        <div className="relative w-full group">
            {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors">
                    {icon}
                </div>
            )}
            <input
                className={cn(
                    'flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400',
                    'transition-all duration-200',
                    'focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100', // Subtle focus ring
                    'hover:border-slate-300',
                    'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
                    icon && 'pl-10',
                    className
                )}
                {...props}
            />
        </div>
    );
};
