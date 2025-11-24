import { Tag } from "antd";

interface Props {
    stock : number;
}

const BadgeStock = ({ stock } : Props) => {
    
    const getColor = (cantidad : number) => {
        if (cantidad > 100) return "green";
        if (cantidad > 50) return "blue";
        if (cantidad > 20) return "orange";
        return "red";
    }

    const getTexto = (cantidad : number) => {
        if ( cantidad === 0) return "Sin Stock";
        if ( cantidad < 10) return "Stock Bajo";
        return `${cantidad} en Stock`;
    }

    return (
        <Tag color={getColor(stock)} >
            {getTexto(stock)}
        </Tag>
    )
}

export default BadgeStock;