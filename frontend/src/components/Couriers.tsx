import React, { useEffect, useState } from 'react';
import {Row, Col, List, Avatar, Spin, Alert, Typography, Button, Modal, Form, Input, Space, message, Popconfirm} from 'antd';
import {UserOutlined, PlusOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import axios from 'axios';
import './Page.css';

const { Title, Text } = Typography;

interface Courier {
    id: number;
    name: string;
}

export default function Couriers() {
    const [couriers, setCouriers] = useState<Courier[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [currentCourier, setCurrentCourier] = useState<Courier | null>(null);
    const [form] = Form.useForm();

    const fetchCouriers = () => {
        setLoading(true);
        axios.get<Courier[]>('/api/couriers')
            .then(res => setCouriers(res.data))
            .catch(err => setError(err.message || 'Server error'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCouriers();
    }, []);

    const showAddModal = () => {
        form.resetFields();
        setAddModalVisible(true);
    };

    const handleAdd = () => {
        form.validateFields()
            .then(values => axios.post<Courier>('/api/couriers', values))
            .then(() => {
                message.success('Courier added successfully');
                fetchCouriers();
                setAddModalVisible(false);
            })
            .catch(err => {
                message.error(err.response?.data?.message || 'Failed to add courier');
            });
    };

    const showEditModal = (c: Courier) => {
        setCurrentCourier(c);
        form.setFieldsValue({ name: c.name });
        setEditModalVisible(true);
    };

    const handleEdit = () => {
        if (!currentCourier) return;
        form.validateFields()
            .then(values => axios.put<Courier>(`/api/couriers/${currentCourier.id}`, values))
            .then(() => {
                message.success('Courier updated');
                fetchCouriers();
                setEditModalVisible(false);
                setCurrentCourier(null);
            })
            .catch(err => {
                message.error(err.response?.data?.message || 'Failed to update courier');
            });
    };

    const handleDelete = (id: number) => {
        axios.delete(`/api/couriers/${id}`)
            .then(() => {
                message.success('Courier deleted');
                fetchCouriers();
            })
            .catch(() => {
                message.error('Failed to delete courier');
            });
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
                            <Button
                                key="edit"
                                type="text"
                                icon={<EditOutlined />}
                                onClick={() => showEditModal(c)}
                            />,
                            <Popconfirm
                                key="delete"
                                title="Are you sure to delete this courier?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => handleDelete(c.id)}
                                okButtonProps={{ style: {
                                        backgroundColor: 'rgb(115,94,140)',
                                        borderColor: 'rgb(115,94,140)',
                                        color: '#fff'
                                    } }}
                                cancelButtonProps={{
                                    style: {
                                        borderColor: 'rgb(115,94,140)',
                                        color: 'rgb(115,94,140)'
                                    }
                                }}
                            >
                                <Button type="text" icon={<DeleteOutlined />}
                                />
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

            <Modal
                title="Add New Courier"
                open={isAddModalVisible}
                onCancel={() => setAddModalVisible(false)}
                footer={null}
                destroyOnHidden
            >
                <Form form={form} layout="vertical" name="add_courier_form" onFinish={handleAdd}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the courier name!' }]}
                    >
                        <Input placeholder="Enter courier name" />
                    </Form.Item>
                    <Form.Item>
                        <Space size="middle" style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setAddModalVisible(false)}
                                    style={{
                                        backgroundColor: 'rgb(115,94,140)',
                                        borderColor: 'rgb(115,94,140)',
                                        color: '#fff'
                                    }}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit"
                                    style={{
                                        backgroundColor: 'rgb(115,94,140)',
                                        borderColor: 'rgb(115,94,140)',
                                        color: '#fff'
                                    }}>
                                Add
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Edit Courier"
                open={isEditModalVisible}
                onCancel={() => {
                    setEditModalVisible(false);
                    setCurrentCourier(null);
                }}
                footer={null}
                destroyOnHidden
            >
                <Form form={form} layout="vertical" name="edit_courier_form" onFinish={handleEdit}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the courier name!' }]}
                    >
                        <Input placeholder="Enter new name" />
                    </Form.Item>
                    <Form.Item>
                        <Space size="middle" style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <Button
                                onClick={() => {
                                    setEditModalVisible(false);
                                    setCurrentCourier(null);
                                }}
                                style={{
                                    backgroundColor: 'rgb(115,94,140)',
                                    borderColor: 'rgb(115,94,140)',
                                    color: '#fff'
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    backgroundColor: 'rgb(115,94,140)',
                                    borderColor: 'rgb(115,94,140)',
                                    color: '#fff'
                                }}
                            >Edit
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
