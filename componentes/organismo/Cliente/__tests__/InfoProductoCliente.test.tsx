import React from "react";
import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Producto } from "../../../../services/productos";

// Mocks para los componentes atómicos que incluyen dependencias externas (antd)
vi.mock("../../../atomos/Titulo", () => ({
  default: (props: any) => React.createElement("h2", props, props.children),
}));
vi.mock("../../../atomos/ImagenProducto", () => ({
  default: (props: any) => React.createElement("img", props),
}));
vi.mock("../../../atomos/BadgeCategoria", () => ({
  default: (props: any) => React.createElement("span", null, props.categoria),
}));
vi.mock("../../../atomos/BadgeStock", () => ({
  default: (props: any) => React.createElement("span", null, `${props.stock} en Stock`),
}));

import InfoProductoCliente from "../InfoProductoCliente";

const productoBase: Partial<Producto> = {
  nombre_producto: "Producto Demo",
  categoria: { id_categoria: 1, nombre_categoria: "Electronica", descripcion_categoria: "" },
  stock: 12,
  precio: 10000,
  descripcion_producto: "Descripción de prueba",
};

describe("InfoProductoCliente", () => {
  it("renderiza título, categoría, stock, precio, descripción e imagen", () => {
    render(<InfoProductoCliente producto={productoBase as Producto} />);

    // Título
    expect(screen.getByText("Producto Demo")).toBeInTheDocument();

    // Categoría (Tag)
    expect(screen.getByText("Electronica")).toBeInTheDocument();

    // Stock: según la lógica de BadgeStock, 12 -> "12 en Stock"
    expect(screen.getByText("12 en Stock")).toBeInTheDocument();

    // Precio formateado (prefijo $)
    const expectedPrice = "$" + (10000).toLocaleString("es-CL", { minimumFractionDigits: 0 });
    expect(screen.getByText(expectedPrice)).toBeInTheDocument();

    // Descripción
    expect(screen.getByText("Descripción de prueba")).toBeInTheDocument();

    // Imagen: debe existir una imagen con alt = nombre del producto
    const img = screen.getByAltText("Producto Demo") as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.getAttribute("src")).toContain("/assets/img/productos/producto_demo.jpg");
  });

  it("muestra 'Sin descripción.' cuando no hay descripción", () => {
    const producto = { ...productoBase, descripcion_producto: "" } as Producto;
    render(<InfoProductoCliente producto={producto} />);
    expect(screen.getByText("Sin descripción.")).toBeInTheDocument();
  });

  it("usa 'General' cuando no existe categoría", () => {
    // Si la propiedad `nombre_categoria` está vacía, el componente debe mostrar "General"
    const producto = {
      ...productoBase,
      categoria: { id_categoria: 0, nombre_categoria: "", descripcion_categoria: "" },
    } as Producto;
    render(<InfoProductoCliente producto={producto} />);
    expect(screen.getByText("General")).toBeInTheDocument();
  });
});
