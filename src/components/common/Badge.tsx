import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'info' | 'purple';
}

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
    const variants = {
        default: 'bg-slate-50 text-slate-600 ring-slate-500/10',
        success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
        warning: 'bg-amber-50 text-amber-700 ring-amber-600/10',
        info: 'bg-sky-50 text-sky-700 ring-sky-600/10',
        purple: 'bg-violet-50 text-violet-700 ring-violet-600/10',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                variants[variant],
                className
            )}
            {...props}
        />
    );
};
