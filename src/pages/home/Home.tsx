import React, {useState} from 'react';
import MainLayout from '../../layouts/MainLayout';
import VinInput from '../../components/VinInput';
import VinHistory from '../../components/VinHistory';
import VinResults from '../../components/VinResults';
import VinService from '../../services/VinService';
import {IHistoryItem, IVinVariable} from '../../types';
import {useVinHistory} from "../../hooks/useVinHistory.ts";

const Home: React.FC = () => {
    const {history, addToHistory} = useVinHistory();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeVin, setActiveVin] = useState('');
    const [results, setResults] = useState<IVinVariable[]>([]);
    const [apiMessage, setApiMessage] = useState('');

    const handleDecode = async (vin: string) => {
        setLoading(true);
        setError('');
        try {
            const res = await VinService.decodeVin(vin);
            const {Results, Message} = res.data;
            setResults(Results);
            setApiMessage(Message);
            setActiveVin(vin);
            addToHistory(vin, Results, Message);
        } catch {
            setError('Не вдалося отримати дані. Перевірте з\'єднання та спробуйте ще раз.');
        } finally {
            setLoading(false);
        }
    };

    const handleHistorySelect = (item: IHistoryItem) => {
        setResults(item.results);
        setApiMessage(item.message);
        setActiveVin(item.vin);
        setError('');
    };

    return (
        <MainLayout>
            <h1 className="page-title">Розшифровка VIN-коду</h1>

            <section className="section">
                <VinInput onSubmit={handleDecode} loading={loading}/>
                {error && <p className="alert alert--danger" role="alert">{error}</p>}
            </section>

            <VinHistory history={history} onSelect={handleHistorySelect} activeVin={activeVin}/>

            {activeVin && !loading && (
                <VinResults results={results} message={apiMessage} vin={activeVin}/>
            )}
        </MainLayout>
    );
};

export default Home;