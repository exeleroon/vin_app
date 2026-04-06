import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import {useVariables} from '../../hooks/useVariables';
import {IVehicleVariable} from '../../types';

const VariableDetail: React.FC = () => {
    const {variableId} = useParams<{ variableId: string }>();
    const navigate = useNavigate();
    const {variables, loading, error} = useVariables();
    const [variable, setVariable] = useState<IVehicleVariable | null>(null);

    useEffect(() => {
        if (!loading && variables.length) {
            const found = variables.find((v) => v.ID === Number(variableId));
            setVariable(found ?? null);
        }
    }, [variables, loading, variableId]);

    return (
        <MainLayout>
            <button className="back-btn btn btn--ghost" onClick={() => navigate('/variables')}>
                ← Назад до списку
            </button>

            {loading && (
                <div className="spinner-wrap">
                    <div className="spinner" role="status" aria-label="Завантаження"/>
                </div>
            )}

            {error && <p className="alert alert--danger">{error}</p>}

            {!loading && !variable && !error && (
                <p className="alert alert--warning">Змінну не знайдено.</p>
            )}

            {variable && (
                <div className="card">
                    <div className="card__header">
                        <h1 style={{fontSize: '1.1rem', fontWeight: 700}}>{variable.Name}</h1>
                    </div>
                    <div className="card__body">
                        <dl className="detail-list">
                            <dt>ID</dt>
                            <dd>{variable.ID}</dd>

                            <dt>Тип даних</dt>
                            <dd>{variable.DataType}</dd>

                            {variable.GroupName && (
                                <>
                                    <dt>Група</dt>
                                    <dd>{variable.GroupName}</dd>
                                </>
                            )}

                            {variable.Description && (
                                <>
                                    <dt>Опис</dt>
                                    <dd>{variable.Description}</dd>
                                </>
                            )}
                        </dl>
                    </div>
                </div>
            )}
        </MainLayout>
    );
};

export default VariableDetail;