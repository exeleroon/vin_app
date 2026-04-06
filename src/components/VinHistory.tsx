import React from 'react';
import {IHistoryItem} from '../types';

interface VinHistoryProps {
    history: IHistoryItem[];
    onSelect: (item: IHistoryItem) => void;
    activeVin?: string;
}

const VinHistory: React.FC<VinHistoryProps> = ({history, onSelect, activeVin}) => {
    if (!history.length) return null;

    return (
        <section className="section" aria-label="Останні запити">
            <div className="card">
                <div className="card__header">Останні запити</div>
                <ul className="history-list" role="list">
                    {history.map((item) => (
                        <li
                            key={item.vin}
                            className={`history-item${item.vin === activeVin ? ' history-item--active' : ''}`}
                            onClick={() => onSelect(item)}
                            role="button"
                            tabIndex={0}
                            aria-pressed={item.vin === activeVin}
                            onKeyDown={(e) => e.key === 'Enter' && onSelect(item)}
                        >
                            <span className="history-vin">{item.vin}</span>
                            <time className="history-date" dateTime={item.decodedAt}>
                                {new Date(item.decodedAt).toLocaleDateString('uk-UA')}
                            </time>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default VinHistory;
