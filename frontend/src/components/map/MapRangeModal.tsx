import React from 'react';
import { Modal, Form, DatePicker, Button } from 'antd';

interface MapRangeModalProps {
    visible: boolean;
    selectedCourier: number | null;
    onCancel: () => void;
    onFinish: (values: any) => void;
}

const MapRangeModal: React.FC<MapRangeModalProps> = ({
                                                         visible,
                                                         selectedCourier,
                                                         onCancel,
                                                         onFinish,
                                                     }) => {
    return (
        <Modal
            title={`Courier #${selectedCourier} Route by Range`}
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form onFinish={onFinish}>
                <Form.Item
                    name="range"
                    rules={[{ required: true, message: 'Please select date & time range' }]}
                >
                    <DatePicker.RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        style={{
                            backgroundColor: 'rgb(115,94,140)',
                            borderColor: 'rgb(115,94,140)',
                            color: '#fff',
                        }}
                    >
                        Show Route & Distance
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default MapRangeModal;
