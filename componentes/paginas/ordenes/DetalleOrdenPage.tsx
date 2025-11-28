import VendedorLayout from "componentes/layout/VendedorLayout"
import { useParams } from "react-router";
import ordenesMock from "modelo/Orden";

const DetalleOrdenPage = () => {

    const { id } = useParams();
    const orden = ordenesMock.find(o => o.id === Number(id));
    
    if (!orden){
        return (
            <VendedorLayout>
                <h1>Producto no encontrado</h1>
            </VendedorLayout>
    )
    }

    return (
        <VendedorLayout>    
            <h1>Detalle de la orden #{orden.id}</h1>
            <h1>Detalle de la orden #{orden.cliente}</h1>
            <h1>Detalle de la orden #{orden.fecha}</h1>

        </VendedorLayout>
    )
}

export default DetalleOrdenPage