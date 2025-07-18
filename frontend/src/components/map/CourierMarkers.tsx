import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { CourierLastLocation } from '../../types/courierLastLocation';

interface CourierMarkersProps {
    couriers: CourierLastLocation[];
    activeMarkerId: string | null;
    onMarkerClick: (id: string, courierId?: number) => void;
}

const CourierMarkers: React.FC<CourierMarkersProps> = ({
                                                           couriers,
                                                           activeMarkerId,
                                                           onMarkerClick,
                                                       }) => (
    <>
        {couriers.map(courier => {
            const key = `courier-${courier.courierId}`;
            return (
                <Marker
                    key={key}
                    position={{ lat: courier.lat, lng: courier.lng }}
                    onClick={() => onMarkerClick(key, courier.courierId)}
                    icon={{
                        url: '/food-delivery.png',
                        scaledSize: new window.google.maps.Size(40, 40),
                        anchor: new window.google.maps.Point(20, 40),
                    }}
                >
                    {activeMarkerId === key && (
                        <InfoWindow onCloseClick={() => onMarkerClick('')}>
                            <div>
                                <strong>Courier:</strong> {courier.courierId}
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            );
        })}
    </>
);

export default CourierMarkers;
