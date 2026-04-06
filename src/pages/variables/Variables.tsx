import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import {useVariables} from '../../hooks/useVariables';

const PAGE_SIZE = 20;
const VISIBLE_KEY = 'vin_variables_visible';

const Variables: React.FC = () => {
    const {variables, loading, error} = useVariables();
    const [visible, setVisible] = useState<number>(() => {
        const saved = sessionStorage.getItem(VISIBLE_KEY);
        return saved ? Number(saved) : PAGE_SIZE;
    });

    const shown = variables.slice(0, visible);
    const hasMore = visible < variables.length;

    const handleShowMore = () => {
        const next = visible + PAGE_SIZE;
        setVisible(next);
        sessionStorage.setItem(VISIBLE_KEY, String(next));
    };

    return (
        <MainLayout>
            <h1 className="page-title">Список змінних VIN</h1>

            {loading && (
                <div className="spinner-wrap">
                    <div className="spinner" role="status" aria-label="Завантаження"/>
                </div>
            )}

            {error && <p className="alert alert--danger">{error}</p>}

            {!loading && !error && (
                <>
                    <div className="card">
                        <div className="table-wrap">
                            <table>
                                <thead>
                                <tr>
                                    <th style={{width: 60}}>ID</th>
                                    <th>Назва</th>
                                    <th>Тип даних</th>
                                </tr>
                                </thead>
                                <tbody>
                                {shown.map((v) => (
                                    <tr key={v.ID}>
                                        <td className="td-muted">{v.ID}</td>
                                        <td>
                                            <Link to={`/variables/${v.ID}`}>{v.Name}</Link>
                                        </td>
                                        <td className="td-muted">{v.DataType}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {hasMore && (
                        <div style={{textAlign: 'center', marginTop: '1.25rem'}}>
                            <button className="btn btn--ghost" onClick={handleShowMore}>
                                Показати ще ({variables.length - visible} залишилось)
                            </button>
                        </div>
                    )}
                </>
            )}
        </MainLayout>
    );
};

export default Variables;