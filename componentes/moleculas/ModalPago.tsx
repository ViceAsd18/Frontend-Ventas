import { Modal, Input, Form, Space, message } from "antd";

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
            onClose();
        });
    };


    return (
        <Modal
            title={`Registrar Pago - Orden #${ordenId}`}
            open={visible}
            onCancel={onClose}
            onOk={handleOk}
            okText="Registrar Pago"
            cancelText="Cancelar"
        >
            <Space direction="vertical" style={{ width: "100%" }}>

                <p><strong>Cliente:</strong> {cliente}</p>
                <p><strong>Total a pagar:</strong> ${total.toLocaleString()}</p>
                <p><strong>Método:</strong> Efectivo</p>

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
