import { InputNumber } from "antd";
import Boton from "componentes/atomos/Boton";
import Imagen from "componentes/atomos/ImagenProducto";
import type { Producto } from "services/productos";

type Props = {
    producto: Producto & { cantidad: number };
    onCantidadChange: (id: number, cantidad: number) => void;
    onEliminar: (id: number) => void;
};

const filaStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "12px 16px",
    borderRadius: 8,
    border: "1px solid #e0e0e0",
    background: "#fafafa",
    marginBottom: 8,
};

const infoStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flex: 1,
};

const precioStyle: React.CSSProperties = {
    width: 100,
    textAlign: "right",
    fontWeight: 600,
    marginRight : 10
};

const OrdenItem = ({ producto, onCantidadChange, onEliminar }: Props) => {
    const normalizarNombre = (nombre: string) =>
        nombre.toLowerCase()
            .replace(/ /g, "_")

    const nombreImagen = normalizarNombre(producto.nombre_producto ?? "producto");


    return (
        <div style={filaStyle}>
            <div style={infoStyle}>
                    <Imagen
                        src={`/assets/img/productos/${nombreImagen}.jpg`}
                        alt={producto.nombre_producto}
                        width={50}
                        height={50}
                        style={{
                            borderRadius: 6,
                            objectFit: "cover",
                            border: "1px solid #ddd",
                        }}
                    />
                
                <span>{producto.nombre_producto}</span>
            </div>

            <InputNumber
                min={1}
                value={producto.cantidad}
                onChange={(v) => onCantidadChange(producto.id_producto ?? 0, v ?? 1)}
            />

            <span style={precioStyle}>
                ${(producto.precio * producto.cantidad).toFixed(2)}
            </span>

            <Boton onClick={() => onEliminar(producto.id_producto ?? 0)} color="#ff4d4f">
                Eliminar
            </Boton>
        </div>
    );
};

export default OrdenItem;
