import React from "react";
import { Row, Col, Space } from "antd";
import Boton from "componentes/atomos/Boton";
import type { Producto } from "services/productos";
import BadgeStock from "componentes/atomos/BadgeStock";
import BadgeCategoria from "componentes/atomos/BadgeCategoria";
import Imagen from "componentes/atomos/ImagenProducto";
import PrecioProducto from "componentes/atomos/PrecioProducto";

type Props = {
    producto: Producto;
    onAgregar: (producto: Producto, cantidad: number) => void;
};

const ProductoFila = ({ producto, onAgregar }: Props) => {
    const nombreImg = (producto.nombre_producto ?? "")
        .toLowerCase()
        .replace(/\s+/g, "_");

    return (
        <Row
            align="middle"
            justify="space-between"
            style={{
                marginBottom: 10,
                background: "#fff",
                borderRadius: 8,
                border: "1px solid #f0f0f0",
                padding: 12,
                flexWrap: "wrap", // importante para que en móviles baje si hace falta
            }}
        >
            {/* Imagen + nombre + badges */}
            <Col xs={24} sm={16} md={16}>
                <Space align="start">
                    <Imagen
                        src={`/assets/img/productos/${nombreImg}.jpg`}
                        alt={producto.nombre_producto}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 6,
                            objectFit: "cover",
                        }}
                    />
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>
                            {producto.nombre_producto}
                        </div>
                        <div
                            style={{
                                marginTop: 6,
                                display: "flex",
                                gap: 6,
                                flexWrap: "wrap",
                            }}
                        >
                            <BadgeCategoria categoria={producto.categoria.nombre_categoria} />
                            <BadgeStock stock={producto.stock} />
                        </div>
                    </div>
                </Space>
            </Col>

            <Col xs={24} sm={8} md={8}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                    flexWrap: "wrap",
                }}
            >
                <PrecioProducto valor={producto.precio} />
                <Boton onClick={() => onAgregar(producto, 1)} color="#2690ed">
                    Agregar
                </Boton>
            </Col>
        </Row>
    );
};

export default ProductoFila;
