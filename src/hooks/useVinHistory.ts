import {useState, useCallback} from 'react';
import {IHistoryItem, IVinVariable} from '../types';
import HistoryService from '../services/HistoryService';

export const useVinHistory = () => {
    const [history, setHistory] = useState<IHistoryItem[]>(HistoryService.getHistory);

    const addToHistory = useCallback((vin: string, results: IVinVariable[], message: string) => {
        const item: IHistoryItem = {
            vin,
            decodedAt: new Date().toISOString(),
            results,
            message,
        };
        HistoryService.addToHistory(item);
        setHistory(HistoryService.getHistory());
    }, []);

    return {history, addToHistory};
};