import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';
import { Courier } from '../../types/courier';

interface Props {
    visible: boolean;
    initialValues?: Courier;
    onCancel: () => void;
    onSubmit: (values: Omit<Courier, 'id'> | Courier) => void;
}

const CourierUpsertModal: React.FC<Props> = ({
                                                 visible,
                                                 initialValues,
                                                 onCancel,
                                                 onSubmit
                                             }) => {
    const [form] = Form.useForm<Courier>();

    useEffect(() => {
        form.setFieldsValue(
            initialValues ?? { name: '' }
        );
    }, [initialValues, form]);

    return (
        <Modal
            title={initialValues ? 'Edit Courier' : 'Add New Courier'}
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
                    label="Name"
                    rules={[{ required: true, message: 'Please input the courier name!' }]}
                >
                    <Input placeholder="Enter courier name" />
                </Form.Item>

                <Form.Item>
                    <Space size="middle" style={{ width: '100%', justifyContent: 'flex-end' }}>
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

export default CourierUpsertModal;
