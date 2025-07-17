import React, { useEffect, useState } from 'react';
import {Card, Row, Col, Spin, Alert, Modal, Form, DatePicker, Button,} from 'antd';
import axios from 'axios';
import useGoogleMapsLoader from '../useGoogleMapsLoader';
import MarkersMap from './MarkersMap';
import { Store } from '../types/store';
import { CourierLastLocation } from '../types/courierLastLocation';
import { CourierLog } from '../types/courierLog';

export default function MapView() {
    const apiKey = '';
    const { isGoogleMapsLoaded, error: mapsError } = useGoogleMapsLoader(apiKey);

    const [stores, setStores] = useState<Store[]>([]);
    const [couriers, setCouriers] = useState<CourierLastLocation[]>([]);
    const [logs, setLogs] = useState<CourierLog[]>([]);
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
        axios
            .get<CourierLog[]>('/api/location-logs/by-range', {
                params: {
                    courierId: selectedCourier,
                    start: start.toISOString(),
                    end: end.toISOString(),
                },
            })
            .then(res => {
                setLogs(res.data);
                setModalVisible(false);
            })
            .catch(err => {
                console.error('LOG FETCH ERROR:', err);
                setModalVisible(false);
            });
    };

    if (mapsError) {
        return <Alert type="error" message={`Map could not loaded: ${mapsError}`} />;
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
                            <MarkersMap
                                stores={stores}
                                couriers={couriers}
                                logs={logs}
                                onCourierClick={onCourierMarkerClick}
                            />
                        ) : (
                            <Spin />
                        )}
                    </Card>
                </Col>
            </Row>

            <Modal
                title={`Courier #${selectedCourier} Route by Range`}
                visible={isModalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <Form onFinish={onFinishRange}>
                    <Form.Item
                        name="range"
                        rules={[{ required: true, message: 'Please select date & time range' }]}
                    >
                        <DatePicker.RangePicker
                            showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block
                                style={{
                                    backgroundColor: 'rgb(115,94,140)',
                                    borderColor: 'rgb(115,94,140)',
                                    color: '#fff'
                                }}
                        >
                            Show Route
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
