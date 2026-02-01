import { useState, useMemo, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { FilterBar } from './components/features/FilterBar';
import { CompanyTable } from './components/features/CompanyTable';
import { CompanyCard } from './components/features/CompanyCard';
import { Pagination } from './components/common/Pagination';
import { Skeleton } from './components/common/Skeleton';
import { EmptyState } from './components/common/EmptyState';
import { useCompanies } from './hooks/useCompanies';
import { useDataEngine } from './hooks/useDataEngine';
import { useDebounce } from './hooks/useDebounce';
import { CompanyFilters, SortField, SortOrder } from './types';
import { AlertCircle } from 'lucide-react';
import { Button } from './components/common/Button';

function App() {
  const { companies, loading, error, industries, locations, refetch } = useCompanies();

  // State
  const [filters, setFilters] = useState<CompanyFilters>({
    search: '',
    industry: 'All',
    location: 'All'
  });

  const [sort, setSort] = useState<{ field: SortField; order: SortOrder }>({
    field: 'name',
    order: 'asc'
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounce search for performance
  const debouncedSearch = useDebounce(filters.search, 300);

  const effectiveFilters = useMemo(() => ({
    ...filters,
    search: debouncedSearch
  }), [filters.industry, filters.location, debouncedSearch]);

  // Data Engine
  const { data: paginatedCompanies, totalCount, totalPages } = useDataEngine(
    companies,
    effectiveFilters,
    sort,
    page,
    pageSize
  );

  // Handlers
  const handleFilterChange = (key: keyof CompanyFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page on filter change
  };

  const handleSortChange = (field: SortField) => {
    setSort(prev => ({
      field,
      // Toggle order if clicking same field, otherwise default to asc
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleReset = () => {
    setFilters({ search: '', industry: 'All', location: 'All' });
    setSort({ field: 'name', order: 'asc' });
    setPage(1);
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Companies</h1>
          <span className="text-sm text-gray-500">
            {loading ? 'Loading...' : `${companies.length} companies available`}
          </span>
        </div>

        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          industries={industries}
          locations={locations}
          sort={sort}
          onSortChange={handleSortChange}
          onReset={handleReset}
        />

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <Button size="sm" onClick={refetch} variant="outline" className="bg-red-50 text-red-800 border-red-200 hover:bg-red-100">
                    Try again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <>
            {paginatedCompanies.length === 0 ? (
              <EmptyState onReset={handleReset} />
            ) : (
              <>
                {/* Desktop View */}
                <div className="hidden lg:block">
                  <CompanyTable companies={paginatedCompanies} />
                </div>

                {/* Mobile View */}
                <div className="grid grid-cols-1 gap-4 lg:hidden sm:grid-cols-2">
                  {paginatedCompanies.map(company => (
                    <CompanyCard key={company.id} company={company} />
                  ))}
                </div>

                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalCount={totalCount}
                  onPageChange={setPage}
                  onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPage(1);
                  }}
                />
              </>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default App;
