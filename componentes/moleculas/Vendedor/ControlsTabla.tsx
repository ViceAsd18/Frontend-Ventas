import { Input, Select, Button, Row, Col } from "antd";
import type { Dispatch, SetStateAction } from "react";

interface Props {
    busqueda: string;
    onBusquedaChange: Dispatch<SetStateAction<string>>;
    filtro?: string;
    onFiltroChange?: (valor: string) => void;
    opcionesFiltro?: string[];
    placeholderBusqueda?: string;
    textoBoton?: string;
    onBotonClick?: () => void;
}

const ControlsTabla = ({
    busqueda,
    onBusquedaChange,
    filtro,
    onFiltroChange,
    opcionesFiltro = [],
    placeholderBusqueda = "Buscar...",
    textoBoton = "Agregar",
    onBotonClick,
}: Props) => {
    return (
        <Row gutter={[16, 16]} justify="start">
            <Col xs={24} sm={12} md={8} lg={6}>
                <Input
                placeholder={placeholderBusqueda}
                value={busqueda}
                onChange={(e) => onBusquedaChange(e.target.value)}
                />
            </Col>

            {opcionesFiltro.length > 0 && (
            <Col xs={24} sm={12} md={6} lg={4}>
                <Select
                    placeholder="Filtrar..."
                    value={filtro}
                    onChange={onFiltroChange}
                    allowClear
                    style={{ width: "100%" }}
                >
                    <Select.Option value="">Todos</Select.Option>
                    {opcionesFiltro.map((opt) => (
                    <Select.Option key={opt} value={opt}>
                        {opt}
                    </Select.Option>
                    ))}
                </Select>
            </Col>
            )}

            {onBotonClick && (
            <Col xs={24} sm={24} md={6} lg={4}>
                <Button type="primary" onClick={onBotonClick} style={{ width: "100%" }}>
                    {textoBoton}
                </Button>
            </Col>
        )}
        </Row>
    );
};

export default ControlsTabla;
