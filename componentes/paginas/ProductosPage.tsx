import VendedorLayout from "componentes/layout/VendedorLayout"
import { Card, Space, Typography, message } from "antd"
import { useState } from "react"
import type { Producto } from "modelo/productoModel"
import { productosMock } from "modelo/productoModel"
import TablaProductos from "componentes/organismo/TablaProducto"
import BarraFiltros from "../../componentes/moleculas/BarraFiltros"

const { Title } = Typography;

const ProductosPage = () => {
    const [productos] = useState<Producto[]>(productosMock);
    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>();
    const [disponibilidadSeleccionada, setDisponibilidadSeleccionada] = useState<string>();

    const handleVerDetalle = (producto: Producto) => {
        message.info(`Viendo detalle de: ${producto.nombre}`);
        //Agregar logica mas adelante para ir al detalle producto
    };

    // Filtrar productos
    const productosFiltrados = productos.filter(producto => {
        const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria = !categoriaSeleccionada || producto.categoria === categoriaSeleccionada;
        
        let coincideDisponibilidad = true;
        if (disponibilidadSeleccionada === "En stock") {
            coincideDisponibilidad = producto.stock > 50;
        } else if (disponibilidadSeleccionada === "Stock Bajo") {
            coincideDisponibilidad = producto.stock > 0 && producto.stock <= 50;
        } else if (disponibilidadSeleccionada === "Sin Stock") {
            coincideDisponibilidad = producto.stock === 0;
        }

        return coincideBusqueda && coincideCategoria && coincideDisponibilidad;
    });

    return (
        <VendedorLayout>
            <Card>
                <Space direction="vertical" style={{ width: "100%" }} size="large">
                    <Title level={2} style={{ margin: 0 }}>
                        Gestión de Productos
                    </Title>
                    
                    {/* Barra de Filtros */}
                    <BarraFiltros
                        busqueda={busqueda}
                        onBusquedaChange={setBusqueda}
                        categoriaSeleccionada={categoriaSeleccionada}
                        onCategoriaChange={setCategoriaSeleccionada}
                        disponibilidadSeleccionada={disponibilidadSeleccionada}
                        onDisponibilidadChange={setDisponibilidadSeleccionada}
                    />

                    {/* Tabla de Productos */}
                    <TablaProductos
                        productos={productosFiltrados}
                        onVerDetalle={handleVerDetalle}
                    />
                </Space>
            </Card>
        </VendedorLayout>
    )
}

export default ProductosPage;