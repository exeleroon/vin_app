import React from 'react';
import {IVinVariable} from '../types';

interface VinResultsProps {
    results: IVinVariable[];
    message: string;
    vin: string;
}

const VinResults: React.FC<VinResultsProps> = ({results, message, vin}) => {
    const filled = results.filter((r) => r.Value && r.Value.trim() !== '');

    return (
        <section aria-labelledby="results-heading">
            <h2 id="results-heading" className="results-heading">
                Результати для <span className="results-vin">{vin}</span>
            </h2>

            {message && (
                <p className="alert alert--info">{message}</p>
            )}

            {filled.length === 0 ? (
                <p className="alert alert--warning">Дані не знайдено або VIN невалідний.</p>
            ) : (
                <div className="card">
                    <div className="table-wrap">
                        <table>
                            <thead>
                            <tr>
                                <th>Параметр</th>
                                <th>Значення</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filled.map((item) => (
                                <tr key={item.VariableId}>
                                    <td className="td-muted">{item.Variable}</td>
                                    <td className="td-value">{item.Value}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </section>
    );
};

export default VinResults;
