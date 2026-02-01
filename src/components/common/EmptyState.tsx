import { SearchX } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export const EmptyState = ({
    title = 'No companies found',
    description = 'We couldn\'t find any companies matching your search filters. Try adjusting your criteria.',
    actionLabel = 'Clear all filters',
    onAction,
}: EmptyStateProps) => {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center animate-in fade-in duration-500">
            <div className="mb-4 rounded-full bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <SearchX className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mb-6 max-w-sm text-sm text-slate-500">{description}</p>
            {onAction && (
                <Button variant="secondary" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};
