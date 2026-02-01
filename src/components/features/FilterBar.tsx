import { Search, RotateCcw, ArrowUpDown } from 'lucide-react';
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
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Search & Filters Group */}
                <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                    <div className="w-full sm:w-72">
                        <Input
                            placeholder="Search companies..."
                            icon={<Search className="h-4 w-4" />}
                            value={filters.search}
                            onChange={(e) => onFilterChange('search', e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                        <Select
                            className="w-full sm:w-48"
                            value={filters.industry}
                            onChange={(e) => onFilterChange('industry', e.target.value)}
                            options={[
                                { value: 'All', label: 'All Industries' },
                                ...industries.map(i => ({ value: i, label: i }))
                            ]}
                        />
                        <Select
                            className="w-full sm:w-48"
                            value={filters.location}
                            onChange={(e) => onFilterChange('location', e.target.value)}
                            options={[
                                { value: 'All', label: 'All Locations' },
                                ...locations.map(l => ({ value: l, label: l }))
                            ]}
                        />
                    </div>
                </div>

                {/* Sorting & Actions */}
                <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4 lg:border-t-0 lg:pt-0 lg:justify-end">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sort</span>
                        <Select
                            className="w-36"
                            value={sort.field}
                            onChange={(e) => onSortChange(e.target.value as SortField)}
                            options={[
                                { value: 'name', label: 'Company Name' },
                                { value: 'founded', label: 'Founded Year' }
                            ]}
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            className="px-2"
                            onClick={() => onSortChange(sort.field)} // Toggle order
                            title={`Sort ${sort.order === 'asc' ? 'Descending' : 'Ascending'}`}
                        >
                            <ArrowUpDown className={`h-4 w-4 transition-transform ${sort.order === 'desc' ? 'rotate-180' : ''}`} />
                        </Button>
                    </div>

                    <div className="h-6 w-[1px] bg-slate-200 hidden lg:block mx-1"></div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onReset}
                        className="text-slate-500 hover:text-slate-700"
                        title="Reset Filters"
                    >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
};
