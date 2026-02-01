import { Search, RotateCcw } from 'lucide-react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { type CompanyFilters, type SortField, type SortOrder } from '../../types';

interface FilterBarProps {
    filters: CompanyFilters;
    onFilterChange: (key: keyof CompanyFilters, value: string) => void;
    industries: string[];
    locations: string[];
    sort: { field: SortField; order: SortOrder };
    onSortChange: (field: SortField) => void;
    onReset: () => void;
}

export const FilterBar = ({
    filters,
    onFilterChange,
    industries,
    locations,
    sort,
    onSortChange,
    onReset,
}: FilterBarProps) => {
    return (
        <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-col gap-4 md:flex-row">
                <div className="w-full md:w-64">
                    <Input
                        placeholder="Search companies..."
                        icon={<Search className="h-4 w-4" />}
                        value={filters.search}
                        onChange={(e) => onFilterChange('search', e.target.value)}
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <Select
                        className="w-full md:w-40"
                        value={filters.industry}
                        onChange={(e) => onFilterChange('industry', e.target.value)}
                        options={[
                            { value: 'All', label: 'All Industries' },
                            ...industries.map(i => ({ value: i, label: i }))
                        ]}
                    />
                    <Select
                        className="w-full md:w-40"
                        value={filters.location}
                        onChange={(e) => onFilterChange('location', e.target.value)}
                        options={[
                            { value: 'All', label: 'All Locations' },
                            ...locations.map(l => ({ value: l, label: l }))
                        ]}
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 border-t pt-4 md:border-t-0 md:pt-0">
                <span className="text-sm text-gray-500 whitespace-nowrap hidden lg:block">Sort by:</span>
                <div className="flex gap-2 w-full md:w-auto">
                    <Select
                        className="w-full md:w-40"
                        value={sort.field}
                        onChange={(e) => onSortChange(e.target.value as SortField)}
                        options={[
                            { value: 'name', label: 'Name' },
                            { value: 'founded', label: 'Founded Year' }
                        ]}
                    />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onReset}
                        className="text-gray-500 hover:text-gray-700"
                        title="Reset Filters"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
