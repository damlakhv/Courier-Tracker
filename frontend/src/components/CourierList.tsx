import React, { useState } from 'react';
import { createCourier } from '../services/courierApi';

export const CourierList: React.FC = () => {
    const [name, setName]       = useState('');
    const [error, setError]     = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleAdd = async () => {
        if (!name.trim()) return;
        setError(null);
        setSuccess(false);
        try {
            await createCourier({ name: name.trim() });
            setSuccess(true);
            setName('');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 16 }}>
            <h2>Add a new courier</h2>

            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <input
                    type="text"
                    placeholder="Courier name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ flex: 1, padding: 8 }}
                />
                <button onClick={handleAdd} disabled={!name.trim()}>
                    Add
                </button>
            </div>

            {success && <p style={{ color: 'green' }}>Courier added successfully!</p>}
            {error   && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};
