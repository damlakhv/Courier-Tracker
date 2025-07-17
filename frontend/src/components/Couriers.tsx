import React, { useEffect, useState } from 'react';
import {Row, Col, List, Avatar, Spin, Alert, Typography, Button, message, Popconfirm, notification} from 'antd';
import { UserOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Page.css';
import CourierUpsertModal, { Courier } from '../components/CourierUpsertModal';

const { Title, Text } = Typography;

export default function Couriers() {
    const [couriers, setCouriers] = useState<Courier[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [currentCourier, setCurrentCourier] = useState<Courier | undefined>(undefined);

    const fetchCouriers = () => {
        setLoading(true);
        axios
            .get<Courier[]>('/api/couriers')
            .then(res => setCouriers(res.data))
            .catch(err => setError(err.message || 'Server error'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCouriers();
    }, []);

    const showAddModal = () => {
        setCurrentCourier(undefined);
        setAddModalVisible(true);
    };
    const handleAdd = async (values: Omit<Courier, 'id'>) => {
        try {
            await axios.post('/api/couriers', values);
            notification.success({
                message: 'Courier Added',
                description: `The courier “${values.name}” was added successfully.`,
            });
            fetchCouriers();
            setAddModalVisible(false);
        } catch (err: any) {
            notification.error({
                message: 'Add Failed',
                description:
                    err.response?.data?.message ||
                    'There was an error adding the courier. Please try again.',
            });
        }
    };

    const showEditModal = (c: Courier) => {
        setCurrentCourier(c);
        setEditModalVisible(true);
    };

    const handleEdit = async (values: Omit<Courier, 'id'> | Courier) => {
        if (!currentCourier) return;
        try {
            await axios.put(`/api/couriers/${currentCourier.id}`, { name: values.name });
            notification.success({
                message: 'Courier Updated',
                description: `Courier with ID ${currentCourier.id} was updated successfully.`,
            });
            fetchCouriers();
            setEditModalVisible(false);
            setCurrentCourier(undefined);
        } catch (err: any) {
            notification.error({
                message: 'Update Failed',
                description:
                    err.response?.data?.message ||
                    'There was an error updating the courier.',
            });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/couriers/${id}`);
            notification.success({
                message: 'Courier Deleted',
                description: `Courier with ID ${id} was deleted successfully.`,
            });
            fetchCouriers();
        } catch {
            notification.error({
                message: 'Delete Failed',
                description: 'There was an error deleting the courier.',
            });
        }
    };

    if (loading) {
        return <Spin tip="Loading couriers..." style={{ margin: '100px auto', display: 'block' }} />;
    }
    if (error) {
        return <Alert type="error" message={error} style={{ margin: 20 }} />;
    }

    return (
        <div className="page-container">
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Title level={2} ellipsis>
                        Couriers
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
                        Add Courier
                    </Button>
                </Col>
            </Row>

            <List<Courier>
                itemLayout="horizontal"
                dataSource={couriers}
                bordered
                renderItem={c => (
                    <List.Item
                        actions={[
                            <Button key="edit" type="text" icon={<EditOutlined />} onClick={() => showEditModal(c)} />,
                            <Popconfirm
                                key="delete"
                                title="Are you sure to delete this courier?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => handleDelete(c.id)}
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
                            title={<Text strong ellipsis>{c.name}</Text>}
                            description={<Text type="secondary">ID: {c.id}</Text>}
                        />
                    </List.Item>
                )}
            />

            <CourierUpsertModal
                visible={isAddModalVisible}
                onCancel={() => setAddModalVisible(false)}
                onSubmit={handleAdd}
            />
            <CourierUpsertModal
                visible={isEditModalVisible}
                initialValues={currentCourier}
                onCancel={() => {
                    setEditModalVisible(false);
                    setCurrentCourier(undefined);
                }}
                onSubmit={handleEdit}
            />
        </div>
    );
}
