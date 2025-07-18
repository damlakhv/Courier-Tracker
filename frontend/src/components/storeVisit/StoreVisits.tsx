import React, { useEffect, useState } from 'react';
import {Row, Col, Card, Spin, Alert, Select, Button, List, Typography, notification} from 'antd';
import axios from 'axios';
import '../Page.css';

const { Option } = Select;
const { Text } = Typography;

interface Store {
    id: number;
    name: string;
}

interface StoreVisitLog {
    id: number;
    entryTime: string;
    courier: { id: number; name: string };
    store: { id: number; name: string };
}

async function fetchStoreVisitLogsByStoreId(storeId: number) {
    const response = await axios.get<StoreVisitLog[]>(`/api/store-visits/store/${storeId}`);
    return response.data;
}

export default function StoreVisits() {
    const [stores, setStores] = useState<Store[]>([]);
    const [selectedStoreId, setSelectedStoreId] = useState<number>();
    const [visitLogs, setVisitLogs] = useState<StoreVisitLog[]>([]);
    const [loadingStores, setLoadingStores] = useState(false);
    const [loadingLogs, setLoadingLogs] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        setLoadingStores(true);
        axios.get<Store[]>('/api/stores')
            .then(res => setStores(res.data))
            .catch(err => setError(err.message || 'Failed to load stores'))
            .finally(() => setLoadingStores(false));
    }, []);

    const handleSearch = () => {
        if (!selectedStoreId) return;
        setLoadingLogs(true);
        setError(undefined);
        fetchStoreVisitLogsByStoreId(selectedStoreId)
            .then(data => setVisitLogs(data))
            .catch(err => setError(err.message || 'Failed to load visit logs'))
            .finally(() => setLoadingLogs(false));
    };

    return (
        <Row justify="center" className="page-container">
            <Col xs={24} sm={24} md={24} lg={25} xl={25} xxl={25}>
                <Card title={<span style={{ fontSize: '28px', fontWeight: 600 }}>Store Visit Logs</span>}
                      style={{ width: '100%' }}>
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={12} md={8}>
                            <Select
                                showSearch
                                placeholder="Select a store"
                                style={{ width: '100%' }}
                                value={selectedStoreId}
                                onChange={value => setSelectedStoreId(value)}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.props.children as string).toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {stores.map(store => (
                                    <Option key={store.id} value={store.id}>
                                        {store.name}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                        <Col xs={24} sm={12} md={4}>
                            <Button
                                type="primary"
                                onClick={handleSearch}
                                disabled={!selectedStoreId}
                                block
                                style={{
                                    backgroundColor: 'rgb(115,94,140)',
                                    borderColor: 'rgb(115,94,140)',
                                    color: '#fff'
                                }}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>

                    {loadingStores && <Spin tip="Loading stores..." style={{ marginTop: 16 }} />}
                    {error && <Alert type="error" message={error} style={{ margin: '16px 0' }} />}

                    {loadingLogs ? (
                        <Spin tip="Loading visit logs..." style={{ marginTop: 16 }} />
                    ) : (
                        <List
                            itemLayout="horizontal"
                            dataSource={visitLogs}
                            locale={{
                                emptyText: selectedStoreId
                                    ? 'No visit logs found.'
                                    : 'Please select a store.'
                            }}
                            style={{ marginTop: 16 }}
                            renderItem={log => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<Text strong>{log.courier.name}</Text>}
                                        description={
                                            <span>
                        <Text type="secondary">Visit Time: </Text>
                                                {new Date(log.entryTime).toLocaleString()}
                      </span>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    )}
                </Card>
            </Col>
        </Row>
    );
}
