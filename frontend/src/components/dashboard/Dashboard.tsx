import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Statistic } from 'antd';
import './Dashboard.css';
import { Bar } from '@ant-design/charts';

export default function Dashboard() {
    const [courierCount, setCourierCount] = useState<number>(0);
    const [storeCount, setStoreCount] = useState<number>(0);
    const [visitsToday, setVisitsToday] = useState<number>(0);
    const [courierDistances, setCourierDistances] = useState<{ name: string; distance: number }[]>([]);

    useEffect(() => {
        axios.get('/api/couriers').then(res => {
            setCourierCount(res.data.length);
            const start = '2025-07-21T00:00:00'; //this date can be changed
            const end = '2025-07-22T00:00:00';
            Promise.all(
                res.data.map((courier: { id: number; name: string }) =>
                    axios
                        .get('/api/location-logs/total-distance', {
                            params: { courierId: courier.id, start, end },
                        })
                        .then(distRes => ({
                            name: courier.name,
                            distance: distRes.data,
                        }))
                        .catch(() => ({
                            name: courier.name,
                            distance: 0,
                        }))
                )
            ).then(results => {
                results.sort((a, b) => b.distance - a.distance);
                setCourierDistances(results);
            });
        });
        axios.get('/api/stores').then(res => setStoreCount(res.data.length));
        axios.get('/api/store-visits/count-today').then(res => setVisitsToday(res.data));
    }, []);

    const filteredData = courierDistances.filter(d => d.distance > 0);

    const barConfig = {
        data: filteredData,
        xField: 'name',
        yField: 'distance',
        color: ['#714f8a'], //this does not work, I don't know why
        legend: false,
        label: {
            position: 'right',
            formatter: (value: number) => value.toFixed(2) + ' km',
        },
        height: Math.max(200, filteredData.length * 40),
        autoFit: true,
        isStack: false,
        isGroup: false,
        barStyle: { radius: [2, 2, 0, 0] },
    };

    return (
        <div className="dashboard-container">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={8}>
                    <Card>
                        <Statistic title="Active Couriers" value={courierCount} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}>
                    <Card>
                        <Statistic title="Stores" value={storeCount} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}>
                    <Card>
                        <Statistic title="Visits Today" value={visitsToday} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
                <Col xs={24} lg={12}>
                    <Card title="Statistics" className="dashboard-card">
                        <h3>Courier Kilometers Traveled (21.07.2025)</h3>
                        <Bar {...barConfig} />
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Statistics" className="dashboard-card">

                    </Card>
                </Col>
            </Row>
        </div>
    );
}
