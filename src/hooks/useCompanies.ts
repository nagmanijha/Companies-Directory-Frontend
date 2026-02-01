import { useState, useEffect, useCallback } from 'react';
import { type Company } from '../types';
import { fetchCompanies, getIndustries, getLocations } from '../services/api';

export const useCompanies = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [industries, setIndustries] = useState<string[]>([]);
    const [locations, setLocations] = useState<string[]>([]);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchCompanies();
            setCompanies(data);
            setIndustries(getIndustries());
            setLocations(getLocations());
        } catch {
            setError('Failed to fetch companies. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, []);

    return { companies, loading, error, industries, locations, refetch: loadData };
};
