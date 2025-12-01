import { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select, message } from "antd";
import { crearProducto } from "services/productos";
import { getCategorias, type Categoria } from "services/categoria";
import { useNavigate } from "react-router";

const { Option } = Select;

const AgregarProductoForm = () => {
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
            const data = await getCategorias();
            setCategorias(data);
            } catch (error) {
            console.error("Error cargando categorías", error);
            }
        };
        fetchCategorias();
    }, []);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await crearProducto(values);
            message.success("Producto creado exitosamente");
            navigate("/productos");
        } catch (error) {
            message.error("Error al crear el producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="nombre_producto" label="Nombre" rules={[{ required: true }]}>
            <Input placeholder="Nombre del producto" />
        </Form.Item>

        <Form.Item name="descripcion_producto" label="Descripción" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Descripción del producto" />
        </Form.Item>

        <Form.Item name="precio" label="Precio" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} placeholder="Precio" />
        </Form.Item>

        <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} placeholder="Stock disponible" />
        </Form.Item>

        <Form.Item name="categoriaId" label="Categoría" rules={[{ required: true }]}>
            <Select placeholder="Selecciona una categoría">
            {categorias.map(c => (
                <Option key={c.id_categoria} value={c.id_categoria}>
                {c.nombre_categoria}
                </Option>
            ))}
            </Select>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
            Crear Producto
            </Button>
        </Form.Item>
        </Form>
    );
};

export default AgregarProductoForm;
