import ClienteLayout from "componentes/layout/ClienteLayout";
import { Typography, Button, Spin, message } from "antd";
import { useState, useEffect } from "react";
import type { Producto } from "../../../services/productos";
import { useNavigate } from "react-router";
import { getProductos } from "../../../services/productos";
import CardProductoCliente from "../../moleculas/Cliente/CardProductoCliente";

const { Title, Paragraph } = Typography;

const HomeClientePage = () => {
    
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        setLoading(true);
        try {
            const data = await getProductos();
            if (Array.isArray(data)) {
                setProductos(data);
            } else {
                console.warn("Backend no respondió array, usando mock vacío");
                setProductos([]);
            }
        } catch (error) {
            message.error("Error cargando el catálogo");
        } finally {
            setLoading(false);
        }
    };

    const heroStyle: React.CSSProperties = {
        background: '#f0f5ff',
        borderRadius: '20px',
        padding: '60px 40px',
        marginBottom: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap-reverse'
    };
    
    return (
        <ClienteLayout>
             <div style={heroStyle}>
                <div style={{ flex: '1 1 400px', paddingRight: '20px' }}>
                    <Title level={1} style={{ fontSize: '48px', marginBottom: '16px', color: '#001529' }}>
                        Bienvenido a <br/> nuestra tienda
                    </Title>
                    <Paragraph style={{ fontSize: '18px', color: '#555', marginBottom: '32px' }}>
                        Explora nuestros productos y encuentra lo que necesitas al mejor precio y calidad.
                    </Paragraph>
                    <Button type="primary" size="large" shape="round" style={{ height: '48px', padding: '0 32px', fontSize: '16px' }}>
                        Ir a la tienda
                    </Button>
                </div>

                <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                        width: '100%',
                        maxWidth: '400px',
                        height: '300px',
                        background: 'linear-gradient(135deg, #ff9c6e 0%, #ffc069 100%)',
                        borderRadius: '20px 100px 20px 20px',
                        boxShadow: '0 10px 30px rgba(255, 120, 117, 0.3)'
                    }}></div>
                </div>
            </div>

            {/* Sección Catálogo */}
            <div style={{ marginTop: '60px' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
                    Productos Destacados
                </Title>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "24px",
                        width: "100%",
                    }}>
                        {productos.map((prod) => (
                            <CardProductoCliente
                                key={prod.id_producto}
                                producto={prod}
                            />
                        ))}
                    </div>
                )}

                {!loading && productos.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#999' }}>
                        No hay productos disponibles por ahora.
                    </div>
                )}
            </div>
        </ClienteLayout>
    )
}
export default HomeClientePage