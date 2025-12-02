import { Modal, Input, Form, Space, Typography, Divider, message } from "antd";
import Titulo from "componentes/atomos/Titulo";
import { useNavigate } from "react-router";

const { Text } = Typography;

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

    const navigate = useNavigate();

    const handleOk = () => {
        form.validateFields().then(values => {
            const montoRecibido = Number(values.monto);

            if (montoRecibido !== total) {
                message.error(`El monto recibido debe ser exactamente $${total.toLocaleString()}`);
                return;
            }

            onRegistrarPago(montoRecibido);
            onClose();
            message.success("Pago registrado correctamente");
            navigate("/ordenes");
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
                    <Titulo nivel={5}>Información del Pago</Titulo>

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
