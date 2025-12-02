// componentes/pages/Cliente/DetalleOrdenClientePage.tsx
import { useParams, useNavigate } from "react-router";
import { Card, Divider, Spin, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import ClienteLayout from "../../layout/ClienteLayout";
import InfoOrdenHeader from "componentes/organismo/Cliente/InfoOrdenHeader";
import ListaProductosOrden from "componentes/organismo/Cliente/ListaProductosOrden";
import { getOrdenById } from "services/orden";
import type { Orden } from "services/orden";
import Titulo from "componentes/atomos/Titulo";

const DetalleOrdenClientePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [orden, setOrden] = useState<Orden | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrden = async () => {
            try {
                if (!id) return;
                const ordenData = await getOrdenById(Number(id));
                setOrden(ordenData || null);
            } catch (error) {
                console.error("Error cargando orden:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrden();
    }, [id]);

    if (loading) {
        return (
            <ClienteLayout>
                <div style={{ padding: 50, textAlign: "center" }}>
                    <Spin size="large" />
                </div>
            </ClienteLayout>
        );
    }

    if (!orden) {
        return (
            <ClienteLayout>
                <div style={{ padding: 50, textAlign: "center" }}>
                    <Titulo nivel={3}>La orden que buscas no existe.</Titulo>
                    <Button onClick={() => navigate("/cliente/mis-ordenes")}>
                        Volver
                    </Button>
                </div>
            </ClienteLayout>
        );
    }

    return (
        <ClienteLayout>
            <div style={{ padding: "20px 0", maxWidth: 1000, margin: "0 auto" }}>
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/cliente/mis-ordenes")}
                    style={{ fontSize: 16, marginBottom: 20 }}
                >
                    Volver a Mis Órdenes
                </Button>

                <Titulo nivel={1}>Detalle de Orden #{orden.id_venta}</Titulo>

                <Card style={{ borderRadius: 12, marginTop: 24 }}>
                    <InfoOrdenHeader
                        fecha={orden.fecha_venta}
                        total={orden.total}
                        metodo_pago={orden.metodo_pago}
                        estado={orden.estado}
                    />

                    <Divider />

                    <Titulo nivel={4}>Productos en esta Orden</Titulo>


                    <ListaProductosOrden detalles={orden.detalles} />

                    <div style={{ textAlign: "right", marginTop: 20 }}>
                        <Titulo nivel={3} style={{ color: "#1890ff" }}>
                            Total: ${orden.total.toLocaleString("es-CL")}
                        </Titulo>
                    </div>
                </Card>
            </div>
        </ClienteLayout>
    );
};

export default DetalleOrdenClientePage;
