import { Input, Select, Button, Space } from "antd";
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
    busqueda, onBusquedaChange,
    filtro, onFiltroChange,
    opcionesFiltro = [],
    placeholderBusqueda = "Buscar...",
    textoBoton = "Agregar",
    onBotonClick,
}: Props) => {
    return (
        <Space style={{ marginBottom: 16 }}>
            <Input
                placeholder={placeholderBusqueda}
                value={busqueda}
                onChange={(e) => onBusquedaChange(e.target.value)}
                style={{ width: 200 }}
            />

            {opcionesFiltro.length > 0 && (
                <Select
                placeholder="Filtrar..."
                value={filtro}
                onChange={onFiltroChange}
                style={{ width: 150 }}
                allowClear
                >
                <Select.Option value="">Todos</Select.Option>
                {opcionesFiltro.map((opt) => (
                    <Select.Option key={opt} value={opt}>
                    {opt}
                    </Select.Option>
                ))}
                </Select>
            )}

            {onBotonClick && (
                <Button type="primary" onClick={onBotonClick}>
                {textoBoton}
                </Button>
            )}
        </Space>
    );
};

export default ControlsTabla;
