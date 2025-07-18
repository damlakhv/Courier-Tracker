import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';
import { Store } from '../../types/store';

interface Props {
    visible: boolean;
    initialValues?: Store;
    onCancel: () => void;
    onSubmit: (values: Omit<Store, 'id'> | Store) => void;
}

const StoreUpsertModal: React.FC<Props> = ({
                                               visible,
                                               initialValues,
                                               onCancel,
                                               onSubmit
                                           }) => {
    const [form] = Form.useForm<Store>();

    useEffect(() => {
        form.setFieldsValue(
            initialValues ?? { name: '', lat: undefined as any, lng: undefined as any }
        );
    }, [initialValues, form]);

    return (
        <Modal
            title={initialValues ? 'Edit Store' : 'Add New Store'}
            open={visible}
            onCancel={onCancel}
            footer={null}
            destroyOnHidden
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={vals => onSubmit({ ...initialValues, ...vals })}
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
                            onClick={onCancel}
                            style={{
                                borderColor: 'rgb(115,94,140)',
                                backgroundColor: '#fff',
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
                            {initialValues ? 'Save' : 'Add'}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default StoreUpsertModal;
