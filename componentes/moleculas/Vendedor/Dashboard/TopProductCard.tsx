import { Card, Typography } from "antd";

const { Text } = Typography;

interface TopProductCardProps {
    nombre: string;
    vendidos: number;
}

const cardStyle : React.CSSProperties = {
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fafafa",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
}

const TopProductCard = ({ nombre, vendidos }: TopProductCardProps) => {
    return (
        <Card
            bordered={false}
            style={cardStyle}
        >
            <Text strong>{nombre}</Text>
            <br />
            <Text type="secondary">{vendidos} vendidos</Text>
        </Card>
    );
};

export default TopProductCard;
