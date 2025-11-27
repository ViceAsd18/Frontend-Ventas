import VendedorLayout from "componentes/layout/VendedorLayout"
import { Card, Space, Typography } from "antd"
import { useState } from "react"
import type { Producto } from "modelo/productoModel"
import { productosMock } from "modelo/productoModel"
import { useNavigate } from "react-router"
import CatalogoProductos from "componentes/organismo/CatalogoProductos"
import Titulo from "componentes/atomos/Titulo"
import ControlsTabla from "componentes/moleculas/ControlsTabla"


const ProductosPage = () => {
    const [productos] = useState<Producto[]>(productosMock);
    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>();

    const navigate = useNavigate();


    const handleVerDetalle = (producto: Producto) => {
        navigate(`/detalle-producto/${producto.id}`);

    };

    const productosFiltrados = productos.filter(producto => {
        const coincideBusqueda = producto.nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase());

        const coincideCategoria =
            !categoriaSeleccionada || producto.categoria === categoriaSeleccionada;

        return coincideBusqueda && coincideCategoria;
    });


    const opcionesCategoria = ["Electrónica", "Wearables"];


    return (
        <VendedorLayout>
            <Card>
                <Space direction="vertical" style={{ width: "100%" }} size="large">
                    <Titulo nivel={1}>Listado de Productos</Titulo>
                    
                    <ControlsTabla
                        busqueda={busqueda}
                        onBusquedaChange={setBusqueda}
                        filtro={categoriaSeleccionada}
                        onFiltroChange={setCategoriaSeleccionada}
                        opcionesFiltro={opcionesCategoria}
                        placeholderBusqueda="Buscar producto..."
                        textoBoton="Agregar Producto"
                        onBotonClick={() => navigate("/crear-producto")}
                    />

                    <CatalogoProductos
                        productos={productosFiltrados}
                        onVerDetalle={handleVerDetalle}
                    />
                </Space>
            </Card>
        </VendedorLayout>
    )
}

export default ProductosPage;