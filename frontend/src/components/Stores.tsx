import React, { useEffect, useState } from 'react';
import { Row, Col, Card, List, Avatar, Spin, Alert, Typography, Button, Modal, Form, Input, Space, message, Popconfirm } from 'antd';
import { UserOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Page.css';

const { Title, Text } = Typography;

interface Store {
    id: number;
    name: string;
    lat: number;
    lng: number;
}

export default function Stores() {
    const [stores, setStores]= useState<Store[]>([]);
    const[loading, setLoading]= useState(false);
    const[error, setError]= useState<string>();
    const[isAddModalVisible, setAddModalVisible]= useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [currentStore, setCurrentStore] =useState<Store | null>(null);
    const[form] =Form.useForm();

    const fetchStores = () => {
        setLoading(true);
        axios.get<Store[]>('/api/stores')
            .then(res=> setStores(res.data))
            .catch(err=> setError(err.message ||'Server Error'))
            .finally(()=> setLoading(false))
    }
    useEffect(()=>{
        fetchStores();
    }, []);

    const showAddModal= () =>{
        form.resetFields();
        setCurrentStore(null);
        setAddModalVisible(true);
    }
    const handleAddStore = (values: Omit<Store, 'id'>) => {
        axios.post<Store[]>('/api/stores', {
            storeInfos: [ values ]
        })
            .then(() => {
                message.success('Store added successfully');
                fetchStores();
                setAddModalVisible(false);
            })
            .catch(err => {
                message.error(err.response?.data?.message || 'Failed to add store');
            });
    };

    const showEditModal = (s : Store) =>{
        setCurrentStore(s);
        form.setFieldsValue({name:s.name, lat: s.lat, lng: s.lng});
        setEditModalVisible(true);
    }

    const handleEdit = () => {
        if (!currentStore) return;
        form
            .validateFields()
            .then(values =>
                axios.put<Store>(`/api/stores/${currentStore.id}`, values)
            )
            .then(() => {
                message.success('Store updated');
                fetchStores();
                setEditModalVisible(false);
                setCurrentStore(null);
            })
            .catch(err => {
                message.error(err.response?.data?.message || 'Failed to update store');
            });
    };

    const handleDelete = (id: number) => {
        axios.delete(`/api/stores/${id}`)
            .then(()=> {
                message.success('Store deleted');
                fetchStores();
            })
            .catch(()=> {
                message.error('Failed to delete store');
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
            <Row justify="space-between" align="middle" gutter={[16,16]}>
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
                renderItem={s=>(
                    <List.Item actions={[
                        <Button
                            key="edit"
                            type="text"
                            icon={<EditOutlined/>}
                            onClick={()=> showEditModal(s)}
                        />,
                        <Popconfirm
                            key="delete"
                            title="Are you sure to delete this store?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleDelete(s.id)}
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
                            <Button type="text" icon={<DeleteOutlined />} />
                        </Popconfirm>
                    ]}>
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
            <Modal
                title={currentStore ? 'Edit Store' : 'Add New Store'}
                open={currentStore ? isEditModalVisible : isAddModalVisible}
                onCancel={() => {
                    setAddModalVisible(false);
                    setEditModalVisible(false);
                    setCurrentStore(null);
                }}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    name={currentStore ? 'edit_store_form' : 'add_store_form'}
                    onFinish={currentStore ? handleEdit : handleAddStore}
                    initialValues={
                        currentStore ?? { name: '', lat: null, lng: null }
                    }
                >
                    <Form.Item
                        name="name"
                        label="Store Name"
                        rules={[{ required: true, message: 'Please input the store name!' }]}
                    >
                        <Input placeholder="Enter store name" />
                    </Form.Item>

                    <Form.Item
                        name="lat"
                        label="Latitude"
                        rules={[{ required: true, message: 'Please input the latitude!' }]}
                    >
                        <Input type="number" step="any" placeholder="Enter latitude" />
                    </Form.Item>

                    <Form.Item
                        name="lng"
                        label="Longitude"
                        rules={[{ required: true, message: 'Please input the longitude!' }]}
                    >
                        <Input type="number" step="any" placeholder="Enter longitude" />
                    </Form.Item>

                    <Form.Item>
                        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <Button
                                onClick={() => {
                                    setAddModalVisible(false);
                                    setEditModalVisible(false);
                                    setCurrentStore(null);
                                }}
                                style={{
                                    borderColor: 'rgb(115,94,140)',
                                    backgroundColor: 'rgb(255,255,255)',
                                    color: '#735e8c'
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
                            >
                                {currentStore ? 'Save' : 'Add'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
