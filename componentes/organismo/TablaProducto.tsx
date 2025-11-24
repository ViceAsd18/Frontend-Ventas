import { Row, Col } from "antd";
import CardProducto from "./CatalogoProductos";
import type { Producto } from "modelo/productoModel";

const CatalogoProductos = ({ productos, onVerDetalle }: { productos: Producto[]; onVerDetalle: (p: Producto) => void }) => {
    return (
    <Row gutter={[16, 16]}>
        {productos.map((prod) => (
        <Col xs={24} sm={12} md={8} lg={6} key={prod.id}>
            <CardProducto producto={prod} onVerDetalle={onVerDetalle} />
        </Col>
        ))}
    </Row>
    );
};

export default CatalogoProductos;