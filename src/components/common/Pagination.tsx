import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { Select } from './Select';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

export const Pagination = ({
    currentPage,
    totalPages,
    pageSize,
    totalCount,
    onPageChange,
    onPageSizeChange
}: PaginationProps) => {
    return (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 bg-white px-4 py-3 sm:flex-row sm:px-6">
            <div className="flex items-center gap-4 text-sm text-gray-700">
                <span>
                    Showing <span className="font-medium">{Math.min(totalCount, (currentPage - 1) * pageSize + 1)}</span> to{' '}
                    <span className="font-medium">{Math.min(totalCount, currentPage * pageSize)}</span> of{' '}
                    <span className="font-medium">{totalCount}</span> results
                </span>

                <div className="flex items-center gap-2">
                    <span className="hidden sm:inline">Rows per page:</span>
                    <Select
                        className="h-8 w-16 px-1 py-0 text-xs"
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        options={[
                            { value: '10', label: '10' },
                            { value: '20', label: '20' },
                            { value: '50', label: '50' }
                        ]}
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        // Simple pagination logic: show all if < 7, otherwise condensed logic could be added
                        // For simplicity in this demo, showing max 5 or surrounding. 
                        // Implementing simple view:
                        (totalPages <= 5 || Math.abs(page - currentPage) <= 1 || page === 1 || page === totalPages) ? (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${currentPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {page}
                            </button>
                        ) : (
                            (page === 2 || page === totalPages - 1) && <span key={`dots-${page}`} className="px-1">...</span>
                        )
                    ))}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
