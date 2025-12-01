import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Orden } from "services/orden";

interface TablaProductosProps {
    detalles: Orden["detalles"];
}

const TablaProductos = ({ detalles }: TablaProductosProps) => {
    const columnas: ColumnsType<Orden["detalles"][number]> = [
    { title: "Producto", dataIndex: ["producto", "nombre_producto"], key: "nombre" },
    { title: "Cantidad", dataIndex: "cantidad", key: "cantidad", align: "right" },
    { title: "Precio Unit.", key: "precioUnit", align: "right",
        render: (_, detalle) => `$${detalle.producto.precio.toLocaleString("es-CL")}`
    },
    { title: "Subtotal", key: "subtotal", align: "right",
        render: (_, detalle) => `$${detalle.subtotal.toLocaleString("es-CL")}`
    },
    ];

    return (
        <Table
            columns={columnas}
            dataSource={detalles}
            pagination={false}
            rowKey="id_detalle"
            size="middle"
            style={{overflow : 'auto'}}
        />
        );
};

export default TablaProductos;
