import { Select } from "antd";

type Opcion = {
    label: string;
    value: number;
};

type Props = {
    opciones: Opcion[];
    valor?: number;
    onChange: (value:  number) => void;
    placeholder?: string;
};

const SelectOpciones = ({ opciones, valor, onChange, placeholder }: Props) => (
    <Select
        showSearch
        value={valor}
        onChange={onChange}
        placeholder={placeholder}
        optionFilterProp="label"
        style={{ width: "100%" }}
        filterOption={(input, option) =>
            (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
        }
        options={opciones}
    />
);

export default SelectOpciones;
