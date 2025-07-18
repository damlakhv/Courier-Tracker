import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { Store } from '../../types/store';

interface StoreMarkersProps {
    stores: Store[];
    activeMarkerId: string | null;
    onMarkerClick: (id: string) => void;
}

const StoreMarkers: React.FC<StoreMarkersProps> = ({
                                                       stores,
                                                       activeMarkerId,
                                                       onMarkerClick,
                                                   }) => (
    <>
        {stores.map(store => {
            const key = `store-${store.id}`;
            return (
                <Marker
                    key={key}
                    position={{ lat: store.lat, lng: store.lng }}
                    onClick={() => onMarkerClick(key)}
                    icon={{
                        url: '/location-pin.png',
                        scaledSize: new window.google.maps.Size(40, 40),
                        anchor: new window.google.maps.Point(20, 40),
                    }}
                >
                    {activeMarkerId === key && (
                        <InfoWindow onCloseClick={() => onMarkerClick('')}>
                            <div>
                                <strong>Store:</strong> {store.name}
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            );
        })}
    </>
);

export default StoreMarkers;
