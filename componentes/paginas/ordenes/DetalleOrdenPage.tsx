import VendedorLayout from "componentes/layout/VendedorLayout"
import { useParams } from "react-router";

const DetalleOrdenPage = () => {

    const { id } = useParams();
    
    return (
        <VendedorLayout>    
            <h1>Detalle de la orden #{id}</h1>
        </VendedorLayout>
    )
}

export default DetalleOrdenPage