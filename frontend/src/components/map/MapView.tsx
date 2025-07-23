import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Alert } from 'antd';
import axios from 'axios';
import useGoogleMapsLoader from '../../useGoogleMapsLoader';
import MapMarkers from './MapMarkers';
import MapRangeModal from './MapRangeModal';
import { Store, CourierLastLocation, CourierLog } from '../types';


export default function MapView() {
    const apiKey = '';
    const { isGoogleMapsLoaded, error: mapsError } = useGoogleMapsLoader(apiKey);

    const [stores, setStores] = useState<Store[]>([]);
    const [couriers, setCouriers] = useState<CourierLastLocation[]>([]);
    const [logs, setLogs] = useState<CourierLog[]>([]);
    const [totalDistance, setTotalDistance] = useState<number | null>(null);
    const [selectedCourier, setSelectedCourier] = useState<number | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            axios.get<Store[]>('/api/stores'),
            axios.get<CourierLastLocation[]>('/api/location-logs/last-locations'),
        ])
            .then(([storesRes, couriersRes]) => {
                setStores(storesRes.data);
                setCouriers(couriersRes.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.response?.data?.message || 'Error');
                setLoading(false);
            });
    }, []);

    const onCourierMarkerClick = (courierId: number) => {
        setSelectedCourier(courierId);
        setModalVisible(true);
    };

    const onFinishRange = (values: any) => {
        if (selectedCourier == null) return;
        const [start, end] = values.range;

        setLoading(true);
        Promise.all([
            axios.get<CourierLog[]>('/api/location-logs/by-range', {
                params: {
                    courierId: selectedCourier,
                    start: start.toISOString(),
                    end: end.toISOString(),
                },
            }),
            axios.get<number>('/api/location-logs/total-distance', {
                params: {
                    courierId: selectedCourier,
                    start: start.toISOString(),
                    end: end.toISOString(),
                },
            }),
        ])
            .then(([logsRes, distRes]) => {
                setLogs(logsRes.data);
                setTotalDistance(distRes.data);
                setModalVisible(false);
                setLoading(false);
            })
            .catch(err => {
                console.error('FETCH ERROR:', err);
                setModalVisible(false);
                setLoading(false);
            });
    };

    if (mapsError) {
        return <Alert type="error" message={`Map could not load: ${mapsError}`} />;
    }

    return (
        <>
            <Row gutter={[16, 16]} className="page-container">
                <Col span={24}>
                    <Card title="Map" style={{ minHeight: 500 }}>
                        {loading ? (
                            <Spin tip="Loading...">
                                <div style={{ height: 400 }} />
                            </Spin>
                        ) : error ? (
                            <Alert type="error" message={error} />
                        ) : isGoogleMapsLoaded ? (
                            <MapMarkers
                                stores={stores}
                                couriers={couriers}
                                logs={logs}
                                totalDistance={totalDistance}
                                onCourierClick={onCourierMarkerClick}
                            />
                        ) : (
                            <Spin />
                        )}
                    </Card>
                </Col>
            </Row>

            <MapRangeModal
                visible={isModalVisible}
                selectedCourier={selectedCourier}
                onCancel={() => setModalVisible(false)}
                onFinish={onFinishRange}
            />
        </>
    );
}
