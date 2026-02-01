import { useMemo } from 'react';
import { Company, CompanyFilters, SortField, SortOrder } from '../types';

export const useDataEngine = (
    companies: Company[],
    filters: CompanyFilters,
    sort: { field: SortField; order: SortOrder },
    page: number,
    pageSize: number
) => {
    const filteredSortedData = useMemo(() => {
        let data = [...companies];

        // 1. Filtering
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            data = data.filter(c => c.name.toLowerCase().includes(searchLower));
        }

        if (filters.industry && filters.industry !== 'All') {
            data = data.filter(c => c.industry === filters.industry);
        }

        if (filters.location && filters.location !== 'All') {
            data = data.filter(c => c.location === filters.location);
        }

        // 2. Sorting
        data.sort((a, b) => {
            let comparison = 0;
            if (sort.field === 'name') {
                comparison = a.name.localeCompare(b.name);
            } else if (sort.field === 'founded') {
                comparison = a.founded - b.founded;
            }

            return sort.order === 'asc' ? comparison : -comparison;
        });

        return data;
    }, [companies, filters, sort]);

    const totalCount = filteredSortedData.length;
    const totalPages = Math.ceil(totalCount / pageSize);

    // 3. Pagination
    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredSortedData.slice(start, start + pageSize);
    }, [filteredSortedData, page, pageSize]);

    return {
        data: paginatedData,
        totalCount,
        totalPages
    };
};
