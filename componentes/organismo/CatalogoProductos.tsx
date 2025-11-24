
import { Card, Row, Col, Button, Badge } from "antd";
import type { Producto } from "modelo/productoModel";
import ImagenProducto from "componentes/atomos/ImagenProducto";

interface Props {
    producto: Producto;
    onVerDetalle: (producto: Producto) => void;
}

const CardProducto = ({ producto, onVerDetalle }: Props) => {
    const stockColor = producto.stock === 0 ? "red" : producto.stock < 20 ? "orange" : "green";

    return (
        <Card
        hoverable
        style={{ width: "100%", marginBottom: 16, borderRadius: 8 }}
        bodyStyle={{ padding: 16 }}
        >
        <div style={{ textAlign: "center" }}>
            <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{
            width: "100%",
            maxWidth: 150,
            height: 150,
            objectFit: "cover",
            borderRadius: 8,
            marginBottom: 12,
            }}
        /> 
        </div>

        <Row gutter={[8, 8]}>
            <Col xs={12}>
                <div style={{ fontWeight: 600 }}>{producto.nombre}</div>
            </Col>
            
            <Col xs={12} style={{ textAlign: "right" }}>
            <Badge 
                color={stockColor}
                text={producto.stock === 0 ? "Sin Stock" : `${producto.stock} en Stock`}
            />
            </Col>

            <Col xs={12}>
                <div>{producto.categoria}</div>
            </Col>

            <Col xs={12} style={{ textAlign: "right", fontWeight: 600 }}>
                ${producto.precio.toLocaleString("es-CL", { minimumFractionDigits: 2 })}
            </Col>
        </Row>

        <div style={{ marginTop: 16, textAlign: "center" }}>
            <Button
                type="primary"
                style={{ width: "100%", maxWidth: 200 }}
                disabled={producto.stock === 0}
                onClick={() => onVerDetalle(producto)}
            >
                Ver detalle
            </Button>
        </div>
</Card>

);
};

export default CardProducto;
