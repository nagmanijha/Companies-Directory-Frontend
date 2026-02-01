export interface Company {
    id: number;
    name: string;
    industry: string;
    location: string;
    size: string;
    founded: number;
    description: string;
}

export type SortField = 'name' | 'founded';
export type SortOrder = 'asc' | 'desc';

export interface CompanyFilters {
    search: string;
    industry: string;
    location: string;
}
