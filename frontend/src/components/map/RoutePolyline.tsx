import React from 'react';
import { Polyline } from '@react-google-maps/api';
import { CourierLog } from '../types';

interface RoutePolylineProps {
    logs: CourierLog[];
}

export default function RoutePolyline({ logs }: RoutePolylineProps) {
    if (logs.length < 2) return null;

    return (
        <Polyline
            path={logs.map(l => ({ lat: l.lat, lng: l.lng }))}
            options={{ strokeColor: 'rgb(174,73,250)', strokeWeight: 2 }}
        />
    );
}