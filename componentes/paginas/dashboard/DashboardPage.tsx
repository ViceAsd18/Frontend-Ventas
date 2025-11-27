import { Card, Col, Row } from "antd"
import VendedorLayout from "componentes/layout/VendedorLayout"

const DashboardPage = () => {
    return (
        <VendedorLayout>
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Ventas Hoy">$5,000</Card>
                </Col>
                <Col span={8}>
                    <Card title="Órdenes Pendientes">15</Card>
                </Col>

                <Col span={8}>
                    <Card title="Productos Activos">42</Card>
                </Col>
            </Row>
        </VendedorLayout>
    )
}

export default DashboardPage