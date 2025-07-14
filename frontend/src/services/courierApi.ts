import axios, {AxiosResponse} from 'axios';

export interface Courier {
    id: number;
    name: string;
}

const api = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000,
});


