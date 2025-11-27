import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Props {
    placeholder?: string;
    value: string;
    onChange: (valor: string) => void;
    width?: number | string;
}

const Buscador = ({ placeholder = "Buscar...", value, onChange, width = 250}: Props) => {
    return (
        <Input
            placeholder={placeholder}
            prefix={<SearchOutlined />}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ maxWidth: width }}
            allowClear
        />
    );
};

export default Buscador;
