import {IHistoryItem} from '../types';

const STORAGE_KEY = 'vin_history';
const MAX_ITEMS = 3;

export default class HistoryService {
    static getHistory(): IHistoryItem[] {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    }

    static addToHistory(item: IHistoryItem): void {
        const history = this.getHistory().filter((h) => h.vin !== item.vin);
        const updated = [item, ...history].slice(0, MAX_ITEMS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }

    static clearHistory(): void {
        localStorage.removeItem(STORAGE_KEY);
    }
}