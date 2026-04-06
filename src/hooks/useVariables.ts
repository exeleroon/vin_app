import {useState, useEffect} from 'react';
import {IVehicleVariable} from '../types';
import VinService from '../services/VinService';

const STORAGE_KEY = 'vin_variables_cache';
const TTL_MS = 60 * 60 * 1000; // 1 hour

interface VariablesCache {
    data: IVehicleVariable[];
    cachedAt: number;
}

const getCache = (): VariablesCache | null => {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed: VariablesCache = JSON.parse(raw);
        if (Date.now() - parsed.cachedAt > TTL_MS) {
            sessionStorage.removeItem(STORAGE_KEY);
            return null;
        }
        return parsed;
    } catch {
        return null;
    }
};

const setCache = (data: IVehicleVariable[]): void => {
    try {
        const cache: VariablesCache = {data, cachedAt: Date.now()};
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    } catch {
        // sessionStorage might be unavailable
    }
};

export const useVariables = () => {
    const [variables, setVariables] = useState<IVehicleVariable[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const load = async () => {
            const cached = getCache();
            if (cached) {
                setVariables(cached.data);
                setLoading(false);
                return;
            }

            try {
                const res = await VinService.getVariablesList();
                setCache(res.data.Results);
                setVariables(res.data.Results);
            } catch {
                setError('Не вдалося завантажити список змінних.');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return {variables, loading, error};
};