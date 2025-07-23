export interface Store {
    id: number;
    name: string;
    lat: number;
    lng: number;
}

export interface Courier {
    id: number;
    name: string;
}

export interface CourierLog {
    id: number;
    courierId: number;
    lat: number;
    lng: number;
    timestamp: string;
}

export interface CourierLastLocation {
    courierId: number;
    lat: number;
    lng: number;
}
