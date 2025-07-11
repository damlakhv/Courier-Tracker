
import React from 'react';
import { Row, Col, Card } from 'antd';
import './Page.css';

export default function MapView() {
    return (
        <Row gutter={[16, 16]} className="page-container">
            <Col xs={24}>
                <Card title="Global Map">
                    <div style={{ height: 400, background: '#f0f2f5' }}>
                        Map placeholder
                    </div>
                </Card>
            </Col>
        </Row>
    );
}
