import { Card, Row, Space } from "antd";

interface ResumenTotalesProps {
    subtotal: number;
    impuesto: number;
    total: number;
}

const ResumenTotales = ({ subtotal, impuesto, total }: ResumenTotalesProps) => {
    return (
        <Card title="Resumen de Totales" style={{ borderRadius: 12, position: "sticky", top: 24 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Row justify="space-between"><span>Subtotal</span><span>${subtotal.toLocaleString("es-CL")}</span></Row>
                <Row justify="space-between"><span>Impuesto 19%</span><span>${impuesto.toLocaleString("es-CL")}</span></Row>
                <hr />
                <Row justify="space-between"><strong>Total</strong><strong>${total.toLocaleString("es-CL")}</strong></Row>
            </Space>
        </Card>
    );
};

export default ResumenTotales;
