import React from 'react';
import { Polyline } from '@react-google-maps/api';
import { CourierLog } from '../../types/courierLog';

interface RoutePolylineProps {
    logs: CourierLog[];
}

const RoutePolyline: React.FC<RoutePolylineProps> = ({ logs }) => {
    if (logs.length < 2) return null;
    return (
        <Polyline
            path={logs.map(l => ({ lat: l.lat, lng: l.lng }))}
            options={{ strokeColor: 'rgb(174,73,250)', strokeWeight: 2 }}
        />
    );
};

export default RoutePolyline;
