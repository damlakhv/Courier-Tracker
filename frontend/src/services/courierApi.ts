import axios from 'axios';

export interface Courier {
    id: number;
    name: string;
}

const api = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000,
});

export const createCourier = async (payload: { name: string }): Promise<Courier> => {
    const resp = await api.post<Courier>('/couriers', payload);
    return resp.data;
};
