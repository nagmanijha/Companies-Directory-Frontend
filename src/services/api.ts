import { companies } from './mockData';
import { Company } from '../types';

const ARTIFICIAL_DELAY_MS = 800;

export interface CompanyResponse {
    data: Company[];
    total: number;
}

export const fetchCompanies = async (): Promise<Company[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...companies]);
        }, ARTIFICIAL_DELAY_MS);
    });
};

export const getIndustries = (): string[] => {
    return Array.from(new Set(companies.map(c => c.industry))).sort();
};

export const getLocations = (): string[] => {
    return Array.from(new Set(companies.map(c => c.location))).sort();
};
