import React from "react";
import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// Mocks de los módulos con alias usados por el componente
vi.mock("componentes/moleculas/Cliente/InfoDato", () => ({
  default: ({ label, value }: any) => (
    <div>
      <span>{label}</span>
      <div>{value}</div>
    </div>
  ),
}));

vi.mock("componentes/atomos/Fecha", () => ({
  default: ({ fecha, variante }: any) => <span>{String(fecha)}</span>,
}));

vi.mock("componentes/atomos/PrecioProducto", () => ({
  default: ({ valor }: any) => <span>{`$${Number(valor).toFixed(2)}`}</span>,
}));

vi.mock("componentes/atomos/BadgeEstado", () => ({
  default: ({ estado }: any) => <span>{String(estado).toUpperCase()}</span>,
}));

import InfoOrdenHeader from "../InfoOrdenHeader";

describe("InfoOrdenHeader", () => {
  it("muestra fecha, total, método de pago y estado correctamente", () => {
    const props = {
      fecha: "2025-11-28 09:15:00",
      total: 123.45,
      metodo_pago: "Tarjeta",
      estado: "completada" as const,
    };

    render(<InfoOrdenHeader {...props} />);

    // Labels
    expect(screen.getByText("Fecha")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Método de Pago")).toBeInTheDocument();

    // Valores
    expect(screen.getByText(props.fecha)).toBeInTheDocument();
    expect(screen.getByText(`$${props.total.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(props.metodo_pago)).toBeInTheDocument();

    // Estado en mayúsculas (mock devuelve toUpperCase)
    expect(screen.getByText("COMPLETADA")).toBeInTheDocument();
  });
});
