import { useState, useEffect } from 'react';
import { type CompanyFilters, type SortField, type SortOrder } from '../types';

export const useUrlSync = (
    initialFilters: CompanyFilters,
    initialSort: { field: SortField; order: SortOrder },
    initialPage: number,
    initialPageSize: number
) => {
    // Initialize state from URL or defaults
    const [filters, setFilters] = useState<CompanyFilters>(() => {
        const params = new URLSearchParams(window.location.search);
        return {
            search: params.get('q') || initialFilters.search,
            industry: params.get('industry') || initialFilters.industry,
            location: params.get('location') || initialFilters.location,
        };
    });

    const [sort, setSort] = useState<{ field: SortField; order: SortOrder }>(() => {
        const params = new URLSearchParams(window.location.search);
        return {
            field: (params.get('sortField') as SortField) || initialSort.field,
            order: (params.get('sortOrder') as SortOrder) || initialSort.order,
        };
    });

    const [page, setPage] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return Number(params.get('page')) || initialPage;
    });

    const [pageSize, setPageSize] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return Number(params.get('pageSize')) || initialPageSize;
    });

    // Sync state to URL
    useEffect(() => {
        const params = new URLSearchParams();

        if (filters.search) params.set('q', filters.search);
        if (filters.industry !== 'All') params.set('industry', filters.industry);
        if (filters.location !== 'All') params.set('location', filters.location);

        if (sort.field !== initialSort.field || sort.order !== initialSort.order) {
            params.set('sortField', sort.field);
            params.set('sortOrder', sort.order);
        }

        if (page !== 1) params.set('page', page.toString());
        if (pageSize !== 10) params.set('pageSize', pageSize.toString());

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newUrl);
    }, [filters, sort, page, pageSize, initialSort]);

    return {
        filters,
        setFilters,
        sort,
        setSort,
        page,
        setPage,
        pageSize,
        setPageSize
    };
};
