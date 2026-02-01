import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { Select } from './Select';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

export const Pagination = ({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
    onPageSizeChange,
}: PaginationProps) => {
    return (
        <div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">
            <div className="flex items-center gap-3 text-sm text-slate-500">
                <Select
                    className="w-20 h-8 text-xs"
                    value={pageSize.toString()}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    options={[
                        { value: '10', label: '10 rows' },
                        { value: '20', label: '20 rows' },
                        { value: '50', label: '50 rows' },
                    ]}
                />
                <span>
                    Showing <span className="font-medium text-slate-900">{((currentPage - 1) * pageSize) + 1}</span>-
                    <span className="font-medium text-slate-900">{Math.min(currentPage * pageSize, totalItems)}</span> of{' '}
                    <span className="font-medium text-slate-900">{totalItems}</span>
                </span>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="h-8 w-8 p-0"
                    title="Previous Page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <span className="text-sm font-medium text-slate-700">
                    Page {currentPage} of {totalPages}
                </span>

                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="h-8 w-8 p-0"
                    title="Next Page"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
