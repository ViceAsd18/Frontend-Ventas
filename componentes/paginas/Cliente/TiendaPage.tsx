import { useState, useEffect } from "react";
import { Typography, Input, Button, Spin, Empty, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ClienteLayout from "../../layout/ClienteLayout";
import CardProductoCliente from "../../moleculas/Cliente/CardProductoCliente";
import { getProductos } from "../../../services/productos";
import type { Producto } from "../../../services/productos";

const { Title, Text } = Typography;

const TiendaPage = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);

    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        setLoading(true);
        try {
            const data = await getProductos();
            if (Array.isArray(data)) setProductos(data);
        } catch (error) {
            console.error("Error al cargar productos");
        } finally {
            setLoading(false);
        }
    };

    const categoriasDisponibles = ["Todos", ...new Set(productos.map(p => (p.categoria as any).nombre_categoria || "General"))];

    const productosFiltrados = productos.filter(producto => {
        const nombreCat = (producto.categoria as any).nombre_categoria || "General";
        const coincideBusqueda = producto.nombre_producto.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria = categoriaSeleccionada === "Todos" || nombreCat === categoriaSeleccionada;
        return coincideBusqueda && coincideCategoria;
    });

    return (
        <ClienteLayout>
            <div style={{ padding: "20px 0", maxWidth: "1200px", margin: "0 auto" }}>

                <div style={{ marginBottom: 40 }}>
                    <Title level={1} style={{ marginBottom: 8 }}>Nuestro Catálogo</Title>
                    <Text type="secondary" style={{ fontSize: 16 }}>
                        Encuentra todo lo que buscas en un solo lugar.
                    </Text>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Input
                        size="large"
                        placeholder="¿Qué estás buscando?"
                        prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        style={{ maxWidth: '400px', borderRadius: '8px' }}
                    />

                    <Space wrap>
                        {categoriasDisponibles.map(cat => (
                            <Button
                                key={cat}
                                type={categoriaSeleccionada === cat ? "primary" : "default"}
                                shape="round"
                                onClick={() => setCategoriaSeleccionada(cat)}
                            >
                                {cat}
                            </Button>
                        ))}
                    </Space>
                </div>

                {loading ? (
                    <div style={{ textAlign: "center", padding: 100 }}>
                        <Spin size="large" />
                    </div>
                ) : productosFiltrados.length > 0 ? (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "24px",
                        width: "100%",
                    }}>
                        {productosFiltrados.map((prod) => (
                            <CardProductoCliente
                                key={prod.id_producto}
                                producto={prod}
                            />
                        ))}
                    </div>
                ) : (
                    <Empty description="No se encontraron productos" />
                )}
            </div>
        </ClienteLayout>
    );
};

export default TiendaPage;