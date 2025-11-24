import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Props {
    placeholder?: string;
    value: string;
    onChange: (valor: string) => void;
    ancho?: number;
}

const BuscadorProductos: React.FC<Props> = ({ 
    placeholder = "Buscar...", 
    value, 
    onChange, 
}) => {
    return (
        <Input
            placeholder={placeholder}
            prefix={<SearchOutlined />}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: '100%' }}
            allowClear
            data-test-id="buscador-productos"
        />
    );
};

export default BuscadorProductos;