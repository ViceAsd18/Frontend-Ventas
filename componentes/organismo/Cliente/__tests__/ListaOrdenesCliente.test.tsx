import React from "react";
import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock de 'antd' List para renderizado determinista en tests
vi.mock("antd", () => {
  const React = require("react");
  const List = ({ dataSource, renderItem, locale }: any) => {
    if (!dataSource || dataSource.length === 0) {
      return React.createElement("div", null, locale?.emptyText || null);
    }
    return React.createElement(
      "div",
      null,
      dataSource.map((item: any, idx: number) => React.createElement("div", { key: idx }, renderItem(item)))
    );
  };
  List.Item = ({ children }: any) => React.createElement("div", null, children);
  const Typography = {
    Text: (props: any) => React.createElement("span", props, props.children),
  };

  return { List, Typography };
});

// Mock del ItemOrdenCliente para evitar dependencias de UI complejas
vi.mock("../../moleculas/Cliente/ItemOrdenCliente", () => ({
  default: ({ orden }: any) => React.createElement("div", null, `ORDER-${orden.id_venta}`),
}));

// También mockear la ruta absoluta que puede resolverse vía alias de tsconfig
vi.mock("componentes/moleculas/Cliente/ItemOrdenCliente", () => ({
  default: ({ orden }: any) => React.createElement("div", null, `ORDER-${orden.id_venta}`),
}));

import ListaOrdenesCliente from "../ListaOrdenesCliente";
import type { Orden } from "services/orden";

describe("ListaOrdenesCliente", () => {
  it("muestra mensaje cuando no hay órdenes", () => {
    render(<ListaOrdenesCliente ordenes={[]} />);

    expect(screen.getByText("No tienes órdenes registradas")).toBeInTheDocument();
  });

  it("renderiza un ItemOrdenCliente por cada orden", () => {
    const ordenes: Orden[] = [
      {
        id_venta: 1,
        fecha_venta: "2025-11-28 09:15:00",
        total: 100,
        estado: "completada",
        metodo_pago: "Tarjeta",
        usuario: { id_usuario: 10, nombre: "Vicen", rol: "cliente" },
        detalles: [
          {
            id_detalle: 1,
            cantidad: 1,
            subtotal: 100,
            producto: { id_producto: 1, nombre_producto: "P1", precio: 100 },
          },
        ],
      },
      {
        id_venta: 2,
        fecha_venta: "2025-11-29 10:00:00",
        total: 200,
        estado: "pendiente",
        metodo_pago: "Efectivo",
        usuario: { id_usuario: 11, nombre: "Ana", rol: "cliente" },
        detalles: [
          {
            id_detalle: 2,
            cantidad: 2,
            subtotal: 200,
            producto: { id_producto: 2, nombre_producto: "P2", precio: 100 },
          },
        ],
      },
    ];

    render(<ListaOrdenesCliente ordenes={ordenes} />);

    // Nuestros mocks renderizan ORDER-<id>
    expect(screen.getByText("ORDER-1")).toBeInTheDocument();
    expect(screen.getByText("ORDER-2")).toBeInTheDocument();
  });
});
