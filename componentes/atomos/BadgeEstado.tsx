import { Badge } from "antd";

interface BadgeEstadoProps {
    estado: 'pendiente' | 'completada' | 'cancelada';
}

const BadgeEstado = ({ estado }: BadgeEstadoProps) => {
    const colorMap = {
        pendiente: "orange",
        completada: "green",
        cancelada: "red",
    } as const;

    return <Badge color={colorMap[estado]} text={estado.toUpperCase()} />;
};

export default BadgeEstado;
