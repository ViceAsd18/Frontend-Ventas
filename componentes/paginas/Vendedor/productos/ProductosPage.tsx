import VendedorLayout from "componentes/layout/VendedorLayout"
import { useEffect, useState } from "react"
import type { Producto } from "services/productos"
import { useNavigate } from "react-router"
import CatalogoProductos from "componentes/organismo/Vendedor/CatalogoProductos"
import Titulo from "componentes/atomos/Titulo"
import ControlsTabla from "componentes/moleculas/Vendedor/ControlsTabla"
import { getCategorias, type Categoria } from "services/categoria"
import { getProductos } from "services/productos"
import { Card, Space } from "antd"



const ProductosPage = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>();

    const navigate = useNavigate();

    const [opcionesCategoria, setOpcionesCategoria] = useState<Categoria[]>([]);
    useEffect(() => {
    const fetchCategorias = async () => {
        try {
        const categorias = await getCategorias();
        setOpcionesCategoria(categorias);
        } catch (err) {
        console.error("Error al cargar categorías", err);
        }
    };
    fetchCategorias();
    }, []);


    useEffect(() => {
    const fetchProductos = async () => {
        try {
        const data = await getProductos();
        setProductos(data);
        } catch (err) {
        console.error("Error al cargar productos", err);
        }
    };

    fetchProductos();
    }, []);



    const handleVerDetalle = (producto: Producto) => {
        navigate(`/detalle-producto/${producto.id_producto}`);

    };

    const productosFiltrados = productos.filter(producto => {
        const coincideBusqueda = producto.nombre_producto
            .toLowerCase()
            .includes(busqueda.toLowerCase());

        const coincideCategoria =
            !categoriaSeleccionada || producto.categoria.nombre_categoria === categoriaSeleccionada;

        return coincideBusqueda && coincideCategoria;
    });




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
                        opcionesFiltro={opcionesCategoria.map(c => c.nombre_categoria)}
                        placeholderBusqueda="Buscar producto..."
                        textoBoton="Agregar Producto"
                        onBotonClick={() => navigate("/agregar-producto")}
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