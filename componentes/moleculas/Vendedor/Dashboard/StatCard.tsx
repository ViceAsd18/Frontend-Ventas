import { Card, Typography } from "antd";
import Titulo from "componentes/atomos/Titulo";
import type React from "react";

const { Text } = Typography;

    interface StatCardProps {
    title: string;
    value: string | number;
}

const cardStyle : React.CSSProperties = {
    borderRadius: 8,
    padding: '1%',
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
}

const StatCard = ({ title, value }: StatCardProps) => {
    return (
        <Card bordered={false} style={cardStyle}>
            <Text style={{ fontSize: 14, color: "#555" }}>{title}</Text>
            <Titulo nivel={4} style={{color : '#1754cf'}}>{value}</Titulo>
        </Card>
    );
};

export default StatCard;
