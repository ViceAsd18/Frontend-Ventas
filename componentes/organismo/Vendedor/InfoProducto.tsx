import React from "react";
import type { Producto } from "services/productos";
import ImagenProducto from "componentes/atomos/ImagenProducto";
import CardInfoProducto from "componentes/moleculas/Vendedor/CardInfoProducto";

interface InfoProductoProps {
    producto: Producto;
}

const contenedorStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    padding: '24px 0',
    maxWidth: '1200px',
    margin: '0 auto',
};

const contenedorImagenStyle: React.CSSProperties = {
    flex: '1 1 55%',
    maxHeight: '450px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
};

const contenedorInfoStyle: React.CSSProperties = {
    flex: '1 1 40%', // 40% del ancho
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
};

const InfoProducto = ({ producto }: InfoProductoProps) => {

    const nombreImagen = producto.nombre_producto
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");

    return (
        <div style={contenedorStyle}>
            <div style={contenedorImagenStyle}>
                <ImagenProducto src={`/assets/img/productos/${nombreImagen}.jpg`} alt={producto.nombre_producto}/>
            </div>
            <div style={contenedorInfoStyle}>
                <CardInfoProducto producto={producto} />
            </div>
        </div>
    );
};

export default InfoProducto;