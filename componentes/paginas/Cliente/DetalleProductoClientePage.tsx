import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Spin, Button, message, Result } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ClienteLayout from "../../layout/ClienteLayout";

import { getProductoById } from "../../../services/productos";
import type { Producto } from "../../../services/productos";
import InfoProducto from "componentes/organismo/Vendedor/InfoProducto";

const DetalleProductoClientePage = () => {
    const { id } = useParams(); // Obtenemos el ID de la URL
    const navigate = useNavigate();
    const [producto, setProducto] = useState<Producto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            cargarProducto(Number(id));
        }
    }, [id]);

    const cargarProducto = async (idProd: number) => {
        setLoading(true);
        try {
            const data = await getProductoById(idProd);
            if (data) {
                setProducto(data);
            } else {
                setProducto(null);
            }
        } catch (error) {
            message.error("Error al cargar el producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ClienteLayout>
            <div style={{ padding: "20px 0", maxWidth: "1200px", margin: "0 auto" }}>
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/cliente/home_cliente")}
                    style={{ marginBottom: 20, fontSize: '16px' }}
                >
                    Volver al catálogo
                </Button>

                {loading && (
                    <div style={{ textAlign: "center", padding: 100 }}>
                        <Spin size="large" tip="Cargando detalles..." />
                    </div>
                )}

                {!loading && !producto && (
                    <Result
                        status="404"
                        title="Producto no encontrado"
                        subTitle="Lo sentimos, el producto que buscas no existe o fue eliminado."
                        extra={<Button type="primary" onClick={() => navigate("/cliente/home_cliente")}>Ir al Inicio</Button>}
                    />
                )}

                {!loading && producto && (
                    <div style={{ background: '#fff', padding: '20px', borderRadius: '12px' }}>
                        <InfoProducto producto={producto} />

                    </div>
                )}
            </div>
        </ClienteLayout>
    );
};

export default DetalleProductoClientePage;