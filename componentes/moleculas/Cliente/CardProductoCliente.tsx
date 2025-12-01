import { Card, Row, Col, Button, Tag } from "antd";
import { useNavigate } from "react-router";
import type { Producto } from "../../../services/productos";
import Imagen from "../../atomos/ImagenProducto";
import BadgeStock from "../../atomos/BadgeStock";

interface Props {
    producto: Producto;
}

const cardStyle: React.CSSProperties = {
    borderRadius: 16,
    width: "100%",
    maxWidth: 300,
    minWidth: 180,
    margin: "0 auto",
    border: "1px solid #f0f0f0",
    transition: "all 0.3s ease",
};

const contenedorImagenStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "12px",
    height: 220,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffffff",
    borderRadius: "16px 16px 0 0",
};

const nombreStyle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "1.3em",
    height: "2.6em",
    overflow: "hidden",
    marginBottom: "8px",
    color: "#1f1f1f"
};

const CardProductoCliente = ({ producto }: Props) => {
    const navigate = useNavigate();


    const nombreRuta = producto.nombre_producto.toLowerCase().replace(/\s+/g, "_")
    const rutaImagen = '/assets/img/productos/' + nombreRuta + ".jpg";

    const nombreCategoria = (producto.categoria as any).nombre_categoria || "General";

    return (
        <Card hoverable style={cardStyle} bodyStyle={{ padding: "16px" }}>
            <div style={contenedorImagenStyle}>
                <Imagen
                    src={rutaImagen}
                    alt={producto.nombre_producto}
                    height="100%"
                    width="100%"
                    style={{ objectFit: "contain", maxHeight: "100%" }}
                />
            </div>

            <div style={{ marginTop: 12 }}>
                <Tag color="blue" style={{ marginBottom: 8, border: 'none', background: '#e6f7ff', color: '#1890ff' }}>
                    {nombreCategoria}
                </Tag>

                <div style={nombreStyle} title={producto.nombre_producto}>
                    {producto.nombre_producto}
                </div>

                <Row align="middle" justify="space-between" style={{ marginTop: 12 }}>
                    <Col>
                        <div style={{ fontWeight: 800, fontSize: "20px", color: "#000" }}>
                            ${producto.precio.toLocaleString("es-CL")}
                        </div>
                    </Col>
                    <Col>
                        <BadgeStock stock={producto.stock} />
                    </Col>
                </Row>
            </div>

            <Button
                type="primary"
                block
                size="large"
                style={{ marginTop: 16, borderRadius: 8, fontWeight: 600 }}
                disabled={producto.stock === 0}
                onClick={() => navigate(`/cliente/producto/${producto.id_producto}`)}
            >
                Ver detalle
            </Button>
        </Card>
    );
};

export default CardProductoCliente;