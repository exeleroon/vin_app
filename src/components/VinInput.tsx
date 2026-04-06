import React, {useState} from 'react';

const VIN_REGEX = /^[A-HJ-NPR-Z0-9]{1,17}$/i;

interface VinInputProps {
    onSubmit: (vin: string) => void;
    loading: boolean;
}

const VinInput: React.FC<VinInputProps> = ({onSubmit, loading}) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [touched, setTouched] = useState(false);

    const validate = (val: string): string => {
        if (!val.trim()) return 'Введіть VIN-код';
        if (val.length > 17) return 'VIN не може перевищувати 17 символів';
        if (!VIN_REGEX.test(val)) return 'VIN містить недозволені символи (I, O, Q заборонені)';
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toUpperCase();
        setValue(val);
        if (touched) setError(validate(val));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched(true);
        const err = validate(value);
        setError(err);
        if (!err) onSubmit(value.trim());
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="form-group">
            <label htmlFor="vin-input" className="form-label">
                VIN-код автомобіля
            </label>
            <div className="input-row">
                <input
                    id="vin-input"
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder="Наприклад: 1FTFW1CT5DFC10312"
                    maxLength={17}
                    autoComplete="off"
                    aria-describedby={error ? 'vin-error' : 'vin-hint'}
                    aria-invalid={!!error}
                    className={`input-text${error ? ' input-text--error' : ''}`}
                />
                <button type="submit" className="btn btn--primary" disabled={loading}>
                    {loading ? 'Розшифровка…' : 'Розшифрувати'}
                </button>
            </div>
            {error
                ? <p id="vin-error" className="form-error" role="alert">{error}</p>
                : <p id="vin-hint" className="form-hint">17 символів, латинські букви (крім I, O, Q) та цифри</p>
            }
        </form>
    );
};

export default VinInput;