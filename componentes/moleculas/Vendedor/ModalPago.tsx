import { Modal, Input, Form, Space, Typography, Divider, message } from "antd";


const { Text, Title } = Typography;

interface Props {
    visible: boolean;
    onClose: () => void;
    ordenId: number;
    cliente: string;
    total: number;
    onRegistrarPago: (monto: number) => void;
}

const ModalPago = ({ visible, onClose, ordenId, cliente, total, onRegistrarPago }: Props) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then(values => {
            const montoRecibido = Number(values.monto);

            if (montoRecibido !== total) {
                message.error(`El monto recibido debe ser exactamente $${total.toLocaleString()}`);
                return;
            }

            onRegistrarPago(montoRecibido);
        });
    };

    return (
        <Modal
            title={`Registrar Pago - Orden #${ordenId}`}
            open={visible}
            onCancel={onClose}
            onOk={handleOk}
            okText="Registrar Pago"
            cancelText="Cerrar"
        >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>

                <div>
                    <Title level={5} style={{ margin: 0 }}>Información del Pago</Title>
                    <Divider style={{ marginTop: 8 }} />

                    <Text><strong>Cliente:</strong> {cliente}</Text><br />
                    <Text><strong>Total:</strong> ${total.toLocaleString()}</Text><br />
                    <Text><strong>Método de pago:</strong> Efectivo</Text>
                </div>

                <Form form={form} layout="vertical" initialValues={{ monto: total }}>
                    <Form.Item
                        label="Monto recibido"
                        name="monto"
                        rules={[{ required: true, message: "Ingresa el monto recibido" }]}
                    >
                        <Input type="number" prefix="$" />
                    </Form.Item>
                </Form>

            </Space>
        </Modal>
    );
};

export default ModalPago;
