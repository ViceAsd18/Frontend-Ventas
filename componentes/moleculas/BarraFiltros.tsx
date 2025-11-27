import { Button, Space, Select } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import Buscador from "componentes/atomos/Buscador";

interface Props {
    busqueda: string;
    onBusquedaChange: (valor: string) => void;
    categoria: string | undefined;
    onCategoriaChange?: (categoria: string) => void;
    disponibilidad: string | undefined;
    onDisponibilidadChange?: (estado: string) => void;
}

const BarraFiltros = ({ busqueda, onBusquedaChange, categoria, onCategoriaChange, disponibilidad, onDisponibilidadChange}: Props) => {

    const categorias = ['Electrónica', 'Ropa', 'Hogar', 'Juguetes'];
    const disponibilidades = ["En stock", "Stock Bajo", "Sin Stock", "Todos"];

    const limpiarFiltros = () => {
        onBusquedaChange("");
        onCategoriaChange?.("");
        onDisponibilidadChange?.("");
    };

    return (
        <Space wrap size="middle" style={{ width: "100%", marginBottom: 16 }}>
            <Buscador
                value={busqueda}
                onChange={onBusquedaChange}
                placeholder="Buscar producto..."
                width={250}
            />

            <Select
                placeholder="Categoría"
                value={categoria}
                onChange={onCategoriaChange}
                style={{ width: 150 }}
                allowClear
                options={categorias.map(c => ({ value: c, label: c }))}
            />

            <Select
                placeholder="Disponibilidad"
                value={disponibilidad}
                onChange={onDisponibilidadChange}
                style={{ width: 150 }}
                allowClear
                options={disponibilidades.map(d => ({
                    value: d === "Todos" ? "" : d,
                    label: d
                }))}
            />

            <Button icon={<ClearOutlined />} onClick={limpiarFiltros}>
                Limpiar
            </Button>
        </Space>
    );
};

export default BarraFiltros;
