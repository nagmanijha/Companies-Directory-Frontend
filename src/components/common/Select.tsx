import { type SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: string; label: string }[];
    placeholder?: string;
}

export const Select = ({ className, options, placeholder, ...props }: SelectProps) => {
    return (
        <div className="relative group">
            <select
                className={cn(
                    'flex h-9 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900',
                    'transition-all duration-200',
                    'focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100',
                    'hover:border-slate-300',
                    'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
                    'pr-8', // Space for chevron
                    className
                )}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none group-hover:text-slate-600 transition-colors" />
        </div>
    );
};
