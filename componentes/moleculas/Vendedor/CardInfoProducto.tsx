import React from "react";
import { Card, Typography, Space } from "antd";
import type { Producto } from "services/productos";
import BadgeStock from "componentes/atomos/BadgeStock";
import BadgeCategoria from "componentes/atomos/BadgeCategoria";
import Titulo from "componentes/atomos/Titulo";

const { Text } = Typography;

interface CardInfoProductoProps {
    producto: Producto;
}

const cardStyle : React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: '1px solid #d9d9d9'
}

const contenedorStyle : React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px' 
}

const precioStyle : React.CSSProperties = {
    fontWeight: 400, 
    fontSize: '1.8rem',
    display: 'block',
    marginBottom: '16px'
}

const detalleAdicionales : React.CSSProperties = {
    display : 'flex',
    justifyContent : 'space-between'
}

const CardInfoProducto: React.FC<CardInfoProductoProps> = ({ producto }) => {
    return (
        <Card
            style={cardStyle}
            bodyStyle={{ padding: '24px' }}
        >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <div style={contenedorStyle}>
                    <div style={{ flex: 1 }}>
                        <Titulo nivel={2} style={{margin : '0 0 10px 0', fontSize : 24}}>
                            {producto.nombre_producto}
                        </Titulo>
                        <div style={{ marginTop : 10}}>
                            <BadgeCategoria categoria={producto.categoria.nombre_categoria}/>
                        </div>
                    </div>

                    <div>
                        <BadgeStock stock={producto.stock}/>
                    </div>
                </div>

                <div>
                    <Text style={precioStyle}>
                        ${producto.precio.toLocaleString("es-CL", { minimumFractionDigits: 2 })}
                    </Text>
                </div>

                <div>
                    <Text style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                        {producto.descripcion_producto}
                    </Text>
                </div>


                <div>
                    <Titulo nivel={3}>Detalles Adicionales</Titulo>
                    <Space direction="vertical" style={{ width: '100%' }} size="small">
                        <div style={detalleAdicionales}>
                            <Text type="secondary">SKU:</Text>
                            <Text strong>{producto.sku || 'N/A'}</Text>
                        </div>
                        <div style={detalleAdicionales}>
                            <Text type="secondary">Marca:</Text>
                            <Text strong>{producto.marca}</Text>
                        </div>
                        <div style={detalleAdicionales}>
                            <Text type="secondary">Proveedor:</Text>
                            <Text strong>{producto.proveedor}</Text>
                        </div>
                    </Space>
                </div>
            </Space>
        </Card>
    );
};

export default CardInfoProducto;