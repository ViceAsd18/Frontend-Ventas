import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

interface Props {
    valor: number;
    tipo?: "normal" | "destacado"; 
    color?: string;
}

const PrecioProducto = ({ valor, tipo = "normal", color }: Props) => {
    let style: React.CSSProperties = {
        fontWeight: tipo === "destacado" ? 500 : 400,
        fontSize: tipo === "destacado" ? 24 : 14,
        color: color || "#000",
    };

    return <Text style={style}>${valor.toFixed(2)}</Text>;
};

export default PrecioProducto;
