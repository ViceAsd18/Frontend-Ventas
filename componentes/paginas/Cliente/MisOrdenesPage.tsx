import ClienteLayout from "../../layout/ClienteLayout";
import { Typography, List, Tag, Button, Card, Space, Row, Col } from "antd";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;

const ordenesMock = [
    { id: 12345, fecha: "15 de Oct, 2024", total: 150000, estado: "Completada" },
    { id: 12344, fecha: "12 de Oct, 2024", total: 85500, estado: "Pendiente" },
    { id: 12342, fecha: "5 de Oct, 2024", total: 210000, estado: "Cancelada" },
];

const MisOrdenesPage = () => {
    const navigate = useNavigate();

    const getTagColor = (estado: string) => {
        if (estado === "Completada") return "success";
        if (estado === "Pendiente") return "warning";
        return "error";
    };

    return (
        <ClienteLayout>
            <div style={{ padding: "20px 0", maxWidth: "1000px", margin: "0 auto" }}>

                {/* Encabezado */}
                <div style={{ marginBottom: 40 }}>
                    <Title level={2} style={{ marginBottom: 8 }}>Mis Órdenes</Title>
                    <Text type="secondary" style={{ fontSize: 16 }}>
                        Revisa el estado de tus compras recientes
                    </Text>
                </div>

                {/* Lista de Órdenes */}
                <List
                    grid={{ gutter: 16, column: 1 }}
                    dataSource={ordenesMock}
                    renderItem={(orden) => (
                        <List.Item>
                            <Card
                                bodyStyle={{ padding: "24px" }}
                                style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                            >
                                <Row align="middle" gutter={[16, 16]}>

                                    {/* ID */}
                                    <Col xs={12} sm={4}>
                                        <Text type="secondary" style={{ fontSize: 12 }}>ID de orden</Text>
                                        <div style={{ fontWeight: "bold", fontSize: 16 }}>#{orden.id}</div>
                                    </Col>

                                    {/* Fecha */}
                                    <Col xs={12} sm={6}>
                                        <Text type="secondary" style={{ fontSize: 12 }}>Fecha</Text>
                                        <div style={{ fontSize: 16 }}>{orden.fecha}</div>
                                    </Col>

                                    {/* Total */}
                                    <Col xs={12} sm={4}>
                                        <Text type="secondary" style={{ fontSize: 12 }}>Total</Text>
                                        <div style={{ fontWeight: "bold", fontSize: 16 }}>
                                            ${orden.total.toLocaleString("es-CL")}
                                        </div>
                                    </Col>

                                    {/* Estado */}
                                    <Col xs={12} sm={6}>
                                        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Estado</Text>
                                        <Tag color={getTagColor(orden.estado)} style={{ borderRadius: 20, padding: "0 12px" }}>
                                            {orden.estado}
                                        </Tag>
                                    </Col>

                                    {/* Botón */}
                                    <Col xs={24} sm={4} style={{ textAlign: "right" }}>
                                        <Button
                                            style={{ background: "#f5f5f5", border: "none", fontWeight: 600 }}
                                            onClick={() => navigate(`/cliente/orden/${orden.id}`)}
                                        >
                                            Ver Detalle
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </ClienteLayout>
    );
};

export default MisOrdenesPage;