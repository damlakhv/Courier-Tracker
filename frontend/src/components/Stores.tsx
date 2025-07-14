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
        axios.get<Store[]>('api/stores')
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
            storeInfos: [ values ]  // controller’ın istediği yapı
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

    //will be added edit and delete operations

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
                title="Add New Store"
                open={isAddModalVisible}
                onCancel={() => setAddModalVisible(false)}
                footer={null}
                destroyOnHidden
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="add_store_form"
                    initialValues={{ name: '', lat: null, lng: null }}
                    onFinish={handleAddStore}
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
                                onClick={() => setAddModalVisible(false)}
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
                            >
                                Add Store
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>


        </div>

    );
}
