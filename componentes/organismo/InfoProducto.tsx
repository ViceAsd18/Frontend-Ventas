import React from "react";
import ImagenProducto from "../atomos/ImagenProducto";
import CardInfoProducto from "../moleculas/CardInfoProducto";
import type {Producto} from "../../modelo/productoModel";

interface InfoProductoProps {
    producto: Producto;
}

const contenedorStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '40px',
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    justifyContent: 'center',
    alignItems: 'flex-start'
};

const contenedorImagenStyle: React.CSSProperties = {
    flex: '1 1 400px',
    height: '500px',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const contenedorInfoStyle: React.CSSProperties = {
    flex: '1 1 350px',
    maxWidth: '500px'
};

const InfoProducto = ({ producto }: InfoProductoProps) => {
    return (
        <div style={contenedorStyle}>
            <div style={contenedorImagenStyle}>
                <ImagenProducto
                    src={producto.imagen}
                    height="100%"
                    width="100%"
                    style={{ objectFit: 'contain' }}
                />
            </div>

            <div style={contenedorInfoStyle}>
                <CardInfoProducto producto={producto} />
            </div>
        </div>
    );
};

export default InfoProducto;