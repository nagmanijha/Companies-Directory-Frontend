import { useMemo, useEffect } from 'react';
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
import { useUrlSync } from './hooks/useUrlSync';
import { type CompanyFilters, type SortField } from './types';
import { AlertCircle } from 'lucide-react';
import { Button } from './components/common/Button';

function App() {
  const { companies, loading, error, industries, locations, refetch } = useCompanies();

  // State with URL Sync
  const {
    filters,
    setFilters,
    sort,
    setSort,
    page,
    setPage,
    pageSize,
    setPageSize
  } = useUrlSync(
    { search: '', industry: 'All', location: 'All' },
    { field: 'name', order: 'asc' },
    1,
    10
  );

  // Debounce search for performance
  const debouncedSearch = useDebounce(filters.search, 300);

  const effectiveFilters = useMemo(() => ({
    search: debouncedSearch,
    industry: filters.industry,
    location: filters.location
  }), [debouncedSearch, filters.industry, filters.location]);

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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Companies</h1>
          {!loading && (
            <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              {companies.length} Total
            </span>
          )}
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
          <div className="rounded-xl border border-red-100 bg-red-50 p-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
                <div className="mt-1 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-3">
                  <Button size="sm" onClick={refetch} variant="outline" className="bg-white text-red-700 border-red-200 hover:bg-red-50">
                    Try again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {/* Realistic Skeleton Loading */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        ) : (
          <>
            {paginatedCompanies.length === 0 ? (
              <EmptyState onAction={handleReset} />
            ) : (
              <div className="space-y-4">
                {/* Result Count Header */}
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    {totalCount} Companies Found
                  </h2>
                </div>

                {/* Desktop View */}
                <div className="hidden lg:block animate-in fade-in duration-500">
                  <CompanyTable companies={paginatedCompanies} />
                </div>

                {/* Mobile View */}
                <div className="grid grid-cols-1 gap-4 lg:hidden sm:grid-cols-2 animate-in fade-in duration-500">
                  {paginatedCompanies.map(company => (
                    <CompanyCard key={company.id} company={company} />
                  ))}
                </div>

                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalItems={totalCount}
                  onPageChange={setPage}
                  onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPage(1);
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default App;
