import { Card, Row, Col, Button } from "antd";
import type { Producto } from "modelo/productoModel";
import Imagen from "componentes/atomos/ImagenProducto";
import BadgeStock from "componentes/atomos/BadgeStock";
import CategoriaProducto from "componentes/atomos/CategoriaProducto";

interface Props {
    producto: Producto;
    onVerDetalle: (producto: Producto) => void;
}

const cardStyle  : React.CSSProperties = {
    borderRadius: 12,
    width: "100%",
    maxWidth: 300,
    minWidth: 180,
    margin: "0 auto",
}

const contenedorImagenStyle: React.CSSProperties = {
    textAlign: "center",
    paddingBottom: 12,
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const imagenStyle : React.CSSProperties = {
    objectFit: "contain",
    maxHeight: "100%",
    maxWidth: "100%",
}

const nombreStyle : React.CSSProperties = {
    fontWeight: 600,
    lineHeight: "18px",
    display: "-webkit-box",
    WebkitLineClamp: 2, 
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
}

const precioStyle : React.CSSProperties = {
    textAlign: "right",
    fontWeight: 600,
    fontSize: 15,
}

const CardProducto = ({ producto, onVerDetalle }: Props) => {
    return (
        <Card
            hoverable
            style={cardStyle}
            bodyStyle={{ padding: 12 }}
        >
            <div style={contenedorImagenStyle}>
                <Imagen
                    src={producto.imagen}
                    alt={producto.nombre}
                    height="100%"
                    style={imagenStyle}
                />
            </div>

            <div style={{ minHeight: 90 }}>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <div style={nombreStyle}>
                            {producto.nombre}
                        </div>
                    </Col>

                    <Col span={12} style={{ textAlign: "right" }}>
                        <BadgeStock stock={producto.stock} />
                    </Col>

                    <Col span={12}>
                        <CategoriaProducto categoria={(producto.categoria as any).nombre_categoria} />
                    </Col>

                    <Col span={12} style={precioStyle}>
                        ${producto.precio.toLocaleString("es-CL", {minimumFractionDigits: 2,})}
                    </Col>
                </Row>
            </div>

            <Button
                type="primary"
                block
                style={{ marginTop: 12 }}
                disabled={producto.stock === 0}
                onClick={() => onVerDetalle(producto)}
            >
                Ver detalle
            </Button>
        </Card>
    );
};

export default CardProducto;
