import React, { useState, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import mapStyle from './mapStyle';
import StoreMarkers from './StoreMarkers';
import CourierMarkers from './CourierMarkers';
import RoutePolyline from './RoutePolyline';
import { Store } from '../../types/store';
import { CourierLastLocation } from '../../types/courierLastLocation';
import { CourierLog } from '../../types/courierLog';

const containerStyle = { width: '100%', height: '400px' };
const DEFAULT_CENTER = { lat: 41.081324, lng: 29.032291 };

interface MarkersMapProps {
    stores: Store[];
    couriers: CourierLastLocation[];
    logs: CourierLog[];
    totalDistance?: number | null;
    onCourierClick: (courierId: number) => void;
}

export default function MarkersMap({
                                       stores,
                                       couriers,
                                       logs,
                                       totalDistance = null,
                                       onCourierClick,
                                   }: MarkersMapProps) {
    const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

    useEffect(() => {
        if (!mapInstance || logs.length === 0) return;
        const { lat, lng } = logs[0];
        mapInstance.panTo({ lat, lng });
        mapInstance.setZoom(14);
    }, [mapInstance, logs]);

    useEffect(() => {
        if (!mapInstance) return;
        const pos = google.maps.ControlPosition.TOP_RIGHT;
        const ctrl = document.createElement('div');
        Object.assign(ctrl.style, {
            background: 'white',
            padding: '6px 12px',
            margin: '15px',
            borderRadius: '4px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
            fontWeight: '500',
        });
        ctrl.innerText = totalDistance != null
            ? `Total distance: ${totalDistance.toFixed(2)} km`
            : '';
        mapInstance.controls[pos].push(ctrl);
        return () => {
            const ctrls = mapInstance.controls[pos];
            for (let i = 0; i < ctrls.getLength(); i++) {
                if (ctrls.getAt(i) === ctrl) {
                    ctrls.removeAt(i);
                    break;
                }
            }
        };
    }, [mapInstance, totalDistance]);

    const handleMarkerClick = (id: string, courierId?: number) => {
        setActiveMarkerId(id);
        if (courierId != null) onCourierClick(courierId);
    };

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={DEFAULT_CENTER}
            zoom={10}
            options={{
                styles: mapStyle,
                zoomControl: true,
                mapTypeControl: true,
                fullscreenControl: true,
                streetViewControl: false,
            }}
            onLoad={map => setMapInstance(map)}
            onUnmount={() => setMapInstance(null)}
        >
            <StoreMarkers
                stores={stores}
                activeMarkerId={activeMarkerId}
                onMarkerClick={id => setActiveMarkerId(id)}
            />

            <CourierMarkers
                couriers={couriers}
                activeMarkerId={activeMarkerId}
                onMarkerClick={handleMarkerClick}
            />

            <RoutePolyline logs={logs} />
        </GoogleMap>
    );
}
