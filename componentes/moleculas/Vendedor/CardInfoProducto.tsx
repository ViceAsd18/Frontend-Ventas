import React from "react";
import { Card, Typography, Space } from "antd";
import type { Producto } from "services/productos";
import BadgeStock from "componentes/atomos/BadgeStock";
import BadgeCategoria from "componentes/atomos/BadgeCategoria";
import Titulo from "componentes/atomos/Titulo";
import PrecioProducto from "componentes/atomos/PrecioProducto";
import Texto from "componentes/atomos/Texto";

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

const CardInfoProducto: React.FC<CardInfoProductoProps> = ({ producto }) => {
    return (
        <Card
            style={cardStyle}
            bodyStyle={{ padding: '24px' }}
        >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <div style={contenedorStyle}>
                    <div style={{ flex: 1 }}>
                        <Titulo nivel={2} style={{margin : '0 0 20px 0', fontSize : 24}}>
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
                    <PrecioProducto valor={producto.precio} tipo="destacado"/>
                </div>

                <div>
                    <Texto style={{fontSize : 16, lineHeight: '1.6', color: '#666'}}>
                        {producto.descripcion_producto}
                    </Texto>
                </div>
            </Space>
        </Card>
    );
};

export default CardInfoProducto;