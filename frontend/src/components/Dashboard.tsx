import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import './Dashboard.css';

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card>
                        <Statistic title="Active Couriers" value={42} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card>
                        <Statistic title="Stores" value={18} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card>
                        <Statistic title="Visits Today" value={12} />
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
