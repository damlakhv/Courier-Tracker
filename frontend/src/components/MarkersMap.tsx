import React, { useState } from 'react';
import {GoogleMap, Marker, InfoWindow, Polyline} from '@react-google-maps/api';
import mapStyle from './mapStyle';
import { Store } from '../types/store';
import { CourierLastLocation } from '../types/courierLastLocation';
import {CourierLog} from "../types/courierLog";

const containerStyle = { width: '100%', height: '400px' };
const DEFAULT_CENTER = { lat: 41.081324, lng: 29.032291 };

interface MarkersMapProps {
    stores: Store[];
    couriers: CourierLastLocation[];
    logs: CourierLog[];
    onCourierClick: (courierId: number) => void;
}

export default function MarkersMap({ stores, couriers,
                                       onCourierClick, logs}: MarkersMapProps) {
    const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);

    const handleMarkerClick = (id: string) => {
        setActiveMarkerId(id);
    };

    const handleInfoWindowClose = () => {
        setActiveMarkerId(null);
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
        >
            {stores.map(store => {
                const key = `store-${store.id}`;
                return (
                    <Marker
                        key={key}
                        position={{ lat: store.lat, lng: store.lng }}
                        onClick={() => handleMarkerClick(key)}
                        icon={{
                            url: '/location-pin.png',
                            scaledSize: new window.google.maps.Size(40, 40),
                            anchor: new window.google.maps.Point(20, 40),
                        }}
                    >
                        {activeMarkerId === key && (
                            <InfoWindow onCloseClick={handleInfoWindowClose}>
                                <div>
                                    <strong>Store:</strong> {store.name}
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                );
            })}

            {couriers.map(courier => {
                const key = `courier-${courier.courierId}`;
                return (
                    <Marker
                        key={key}
                        position={{ lat: courier.lat, lng: courier.lng }}
                        onClick={() => {handleMarkerClick(key);
                            onCourierClick(courier.courierId);}}
                        icon={{
                            url: '/food-delivery.png',
                            scaledSize: new window.google.maps.Size(40, 40),
                            anchor: new window.google.maps.Point(20, 40),
                        }}
                    >
                        {activeMarkerId === key && (
                            <InfoWindow onCloseClick={handleInfoWindowClose}>
                                <div>
                                    <strong>Courier:</strong> {courier.courierId}
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                );
            })}
            {logs.length > 0 && (
                <Polyline
                    path={logs.map(l => ({ lat: l.lat, lng: l.lng }))}
                    options={{ strokeColor: 'rgb(174,73,250)', strokeWeight: 2 }}
                />)}
        </GoogleMap>
    );
}
