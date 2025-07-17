import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Statistic } from 'antd';
import './Dashboard.css';

export default function Dashboard() {
    const [courierCount, setCourierCount] = useState<number>(0);
    const [storeCount, setStoreCount] = useState<number>(0);
    const [visitsToday, setVisitsToday] = useState<number>(0);

    useEffect(() => {
        axios.get('/api/couriers').then(res => setCourierCount(res.data.length));
        axios.get('/api/stores').then(res => setStoreCount(res.data.length));
        axios.get('/api/store-visits/count-today').then(res => setVisitsToday(res.data));
    }, []);

    return (
        <div className="dashboard-container">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card>
                        <Statistic title="Active Couriers" value={courierCount} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card>
                        <Statistic title="Stores" value={storeCount} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card>
                        <Statistic title="Visits Today" value={visitsToday} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card>
                        <Statistic title="Deliveries Pending" value={7} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 24}}>
                <Col xs={24} lg={12}>
                    <Card title="Recent Store Visits" className="dashboard-card">

                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Courier Locations Map" className="dashboard-card">

                    </Card>
                </Col>
            </Row>
        </div>
    );
}
