import { Button, Space, Select } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import BuscadorProductos from "componentes/atomos/BuscadorProducto";

const { Option } = Select;

interface Props {
    busqueda: string;
    onBusquedaChange: (valor: string) => void;
    categoriaSeleccionada?: string;
    onCategoriaChange?: (categoria: string) => void;
    disponibilidadSeleccionada?: string;
    onDisponibilidadChange?: (disponibilidad: string) => void;
}

const BarraFiltros: React.FC<Props> = ({
    busqueda, 
    onBusquedaChange, 
    categoriaSeleccionada, 
    onCategoriaChange, 
    disponibilidadSeleccionada, 
    onDisponibilidadChange 
}) => {

    const categorias = ['Electrónica', 'Ropa', 'Hogar', 'Juguetes'];
    const disponibilidades = ["En stock", "Stock Bajo", "Sin Stock", 'Todos'];

    const handleLimpiarFiltros = () => {
        onBusquedaChange("");
        onCategoriaChange?.("");
        onDisponibilidadChange?.("");
    };

    return (
        <Space wrap size='middle' style={{ width: '100%', marginBottom: 16 }}>
            <BuscadorProductos
                value={busqueda}
                onChange={onBusquedaChange}
                placeholder="Buscar Producto..."
                ancho={250}
            />

            <Select
                placeholder='Categoría'
                value={categoriaSeleccionada}
                onChange={onCategoriaChange}
                style={{ width: 150 }}
                allowClear
            >
                {categorias.map((categoria) => (
                    <Option key={categoria} value={categoria}>
                        {categoria}
                    </Option>
                ))}
            </Select>

            <Select
                placeholder="Disponibilidad"
                value={disponibilidadSeleccionada}
                onChange={onDisponibilidadChange}
                style={{ width: 150 }}
                allowClear
            >
                {disponibilidades.map(disponibilidad => (
                    <Option key={disponibilidad} value={disponibilidad === "Todos" ? "" : disponibilidad}>
                        {disponibilidad}
                    </Option>
                ))}
            </Select>

            <Button
                icon={<ClearOutlined />}
                onClick={handleLimpiarFiltros}
                type="default"
            >
                Limpiar
            </Button>
        </Space>
    )
}

export default BarraFiltros