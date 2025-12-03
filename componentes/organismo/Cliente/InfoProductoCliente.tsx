import React from "react";
import { Row, Col, Typography, Space, Divider } from "antd";
import type {Producto} from "../../../services/productos";
import ImagenProducto from "../../atomos/ImagenProducto";
import Titulo from "../../atomos/Titulo";
import BadgeStock from "../../atomos/BadgeStock";
import BadgeCategoria from "../../atomos/BadgeCategoria";
const { Text } = Typography;

interface Props {
    producto: Producto;
}

const precioStyle: React.CSSProperties = {
    fontWeight: 400,
    fontSize: '2rem',
    display: 'block',
    margin: '16px 0',
    color: '#000'
};

const detalleAdicionales: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px'
};

const InfoProductoCliente = ({ producto }: Props) => {

    // Resolver Imagen
    const nombreCategoria = (producto.categoria as any).nombre_categoria || "General";

    const nombreRuta = producto.nombre_producto?.toLowerCase().replace(/\s+/g, "_")
    const rutaImagen = '/assets/img/productos/' + nombreRuta + ".jpg" || "https://via.placeholder.com/300?text=Sin+Imagen";

    return (
        <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #d9d9d9' }}>
            <Row gutter={[48, 32]} align="middle">

                <Col xs={24} md={12}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        minHeight: '400px'
                    }}>
                        <ImagenProducto
                            src={rutaImagen}
                            alt={producto.nombre_producto}
                            height="100%"
                            width="100%"
                            style={{ objectFit: 'contain', maxHeight: '450px' }}
                        />
                    </div>
                </Col>

                <Col xs={24} md={12}>
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>

                        {/* Encabezado */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <Titulo nivel={2} style={{ margin: '0 0 10px 0', fontSize: 28 }}>
                                    {producto.nombre_producto}
                                </Titulo>
                                <BadgeCategoria categoria={nombreCategoria} />
                            </div>
                            <BadgeStock stock={producto.stock}/>
                        </div>

                        <div>
                            <Text style={precioStyle}>
                                ${producto.precio.toLocaleString("es-CL", { minimumFractionDigits: 0 })}
                            </Text>
                        </div>

                        <div>
                            <Text style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                                {producto.descripcion_producto  || "Sin descripción."}
                            </Text>
                        </div>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default InfoProductoCliente;