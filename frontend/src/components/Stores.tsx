import React, { useEffect, useState } from 'react';
import {Row, Col, List, Avatar, Spin, Alert, Typography, Button, message, Popconfirm, Space, notification} from 'antd';
import {UserOutlined, PlusOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import axios from 'axios';
import './Page.css';
import { Store } from '../types/store';
import StoreUpsertModal from '../components/StoreUpsertModal';

const { Title, Text } = Typography;

export default function Stores() {
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [currentStore, setCurrentStore] = useState<Store | undefined>(undefined);

    const fetchStores = () => {
        setLoading(true);
        axios
            .get<Store[]>('/api/stores')
            .then(res => setStores(res.data))
            .catch(err => setError(err.message || 'Server Error'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchStores();
    }, []);

    const showAddModal = () => {
        setCurrentStore(undefined);
        setAddModalVisible(true);
    };
    const handleAddStore = async (values: Omit<Store, 'id'>) => {
        try {
            await axios.post('/api/stores', { storeInfos: [values] });
            notification.success({
                message: 'Store Added',
                placement: 'topRight',
                duration: 5,
                description: `Store “${values.name}” was added successfully.`,
            });
            fetchStores();
            setAddModalVisible(false);
        } catch (err: any) {
            notification.error({
                message: 'Add Failed',
                placement: 'topRight',
                duration: 5,
                description:
                    err.response?.data?.message ||
                    'There was an error adding the store. Please try again.',
            });
        }
    };

    const showEditModal = (store: Store) => {
        setCurrentStore(store);
        setEditModalVisible(true);
    };
    const handleEditStore = async (
        values: Omit<Store, 'id'> & Partial<Pick<Store, 'id'>>
    ) => {
        if (!currentStore) return;
        try {
            await axios.put(`/api/stores/${currentStore.id}`, values);
            notification.success({
                message: 'Store Updated',
                description: `Store with ID ${currentStore.id} was updated successfully.`,
            });
            fetchStores();
            setEditModalVisible(false);
            setCurrentStore(undefined);
        } catch (err: any) {
            notification.error({
                message: 'Update Failed',
                description:
                    err.response?.data?.message ||
                    'There was an error updating the store.',
            });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/stores/${id}`);
            notification.success({
                message: 'Store Deleted',
                description: `Store with ID ${id} was deleted successfully.`,
            });
            fetchStores();
        } catch {
            notification.error({
                message: 'Delete Failed',
                description: 'There was an error deleting the store.',
            });
        }
    };

    if (loading) {
        return (
            <Spin
                tip="Loading stores..."
                style={{ margin: '100px auto', display: 'block' }}
            />
        );
    }
    if (error) {
        return <Alert type="error" message={error} style={{ margin: 20 }} />;
    }

    return (
        <div className="page-container">
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Title level={2} ellipsis>
                        Stores
                    </Title>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} style={{ textAlign: 'right' }}>
                    <Button
                        type="primary"
                        block
                        icon={<PlusOutlined />}
                        onClick={showAddModal}
                        style={{
                            backgroundColor: 'rgb(115,94,140)',
                            borderColor: 'rgb(115,94,140)',
                            color: '#fff'
                        }}
                    >
                        Add Store
                    </Button>
                </Col>
            </Row>

            <List<Store>
                itemLayout="horizontal"
                dataSource={stores}
                bordered
                renderItem={s => (
                    <List.Item
                        actions={[
                            <Button
                                key="edit"
                                type="text"
                                icon={<EditOutlined />}
                                onClick={() => showEditModal(s)}
                            />,
                            <Popconfirm
                                key="delete"
                                title="Are you sure to delete this store?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => handleDelete(s.id)}
                                okButtonProps={{
                                    style: {
                                        backgroundColor: 'rgb(115,94,140)',
                                        borderColor: 'rgb(115,94,140)',
                                        color: '#fff'
                                    }
                                }}
                                cancelButtonProps={{
                                    style: {
                                        borderColor: 'rgb(115,94,140)',
                                        color: 'rgb(115,94,140)'
                                    }
                                }}
                            >
                                <Button type="text" icon={<DeleteOutlined />} />
                            </Popconfirm>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title={<Text strong ellipsis>{s.name}</Text>}
                            description={
                                <Space direction="vertical" size={0}>
                                    <Text type="secondary">ID: {s.id}</Text>
                                    <Text type="secondary">Latitude: {s.lat}</Text>
                                    <Text type="secondary">Longitude: {s.lng}</Text>
                                </Space>
                            }
                        />
                    </List.Item>
                )}
            />

            <StoreUpsertModal
                visible={isAddModalVisible}
                onCancel={() => setAddModalVisible(false)}
                onSubmit={handleAddStore}
            />

            <StoreUpsertModal
                visible={isEditModalVisible}
                initialValues={currentStore}
                onCancel={() => {
                    setEditModalVisible(false);
                    setCurrentStore(undefined);
                }}
                onSubmit={handleEditStore}
            />
        </div>
    );
}
