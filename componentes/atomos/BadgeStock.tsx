import { Tag } from "antd";

interface Props {
    stock : number;
}

const BadgeStock = ({ stock } : Props) => {
    
    const getColor = (cantidad: number) => {
        if (cantidad === 0) return "gray";
        if (cantidad <= 15) return "red";
        if (cantidad <= 30) return "orange";
        return "green";
    }


    const getTexto = (cantidad : number) => {
        if ( cantidad === 0) return "Sin Stock";
        if ( cantidad < 10) return `${cantidad} Bajo Stock`;
        return `${cantidad} en Stock`;
    }

    return (
        <Tag color={getColor(stock)} >
            {getTexto(stock)}
        </Tag>
    )
}

export default BadgeStock;