import { SearchX } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
    title?: string;
    description?: string;
    onReset?: () => void;
}

export const EmptyState = ({
    title = "No companies found",
    description = "Try adjusting your filters or search terms.",
    onReset
}: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <SearchX className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>
            {onReset && (
                <div className="mt-6">
                    <Button variant="outline" onClick={onReset}>
                        Clear all filters
                    </Button>
                </div>
            )}
        </div>
    );
};
