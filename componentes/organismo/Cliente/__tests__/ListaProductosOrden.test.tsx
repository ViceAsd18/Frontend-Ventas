import React from "react";
import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock parcial de 'antd' para reemplazar solo el Table por una implementación simple
vi.mock("antd", () => {
	const React = require("react");

	const Table = ({ dataSource, columns }: any) => {
		return React.createElement(
			"table",
			null,
			React.createElement(
				"thead",
				null,
				React.createElement(
					"tr",
					null,
					columns.map((col: any, i: number) => React.createElement("th", { key: i }, col.title))
				)
			),
			React.createElement(
				"tbody",
				null,
				(dataSource || []).map((row: any, rIdx: number) =>
					React.createElement(
						"tr",
						{ key: rIdx },
						columns.map((col: any, cIdx: number) => {
							let content: any = null;
							if (typeof col.render === "function") {
								content = col.render(null, row);
							} else if (col.dataIndex) {
								content = row[col.dataIndex];
							}
							return React.createElement("td", { key: cIdx, style: { textAlign: col.align || "left" } }, content);
						})
					)
				)
			)
		);
	};

	const Typography = {
		Text: (props: any) => React.createElement("span", props, props.children),
	};

	return { Table, Typography };
});

import ListaProductosOrden from "../ListaProductosOrden";
import type { ProductoDetalle } from "../ListaProductosOrden";

describe("ListaProductosOrden", () => {
	it("muestra las columnas esperadas", () => {
		render(<ListaProductosOrden detalles={[]} />);

		expect(screen.getByText("Producto")).toBeInTheDocument();
		expect(screen.getByText("Cantidad")).toBeInTheDocument();
		expect(screen.getByText("Precio Unitario")).toBeInTheDocument();
		expect(screen.getByText("Subtotal")).toBeInTheDocument();
	});

	it("renderiza filas con nombre, cantidad, precio y subtotal formateado", () => {
		const detalles: ProductoDetalle[] = [
			{
				id_detalle: 1,
				cantidad: 2,
				producto: { id_producto: 1, nombre_producto: "Producto A", precio: 1500 },
			},
			{
				id_detalle: 2,
				cantidad: 1,
				producto: { id_producto: 2, nombre_producto: "Producto B", precio: 2500 },
			},
		];

		render(<ListaProductosOrden detalles={detalles} />);

		// Nombres
		expect(screen.getByText("Producto A")).toBeInTheDocument();
		expect(screen.getByText("Producto B")).toBeInTheDocument();

		// Cantidades
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("1")).toBeInTheDocument();

		// Precios y subtotales formateados según 'es-CL'
		const p1 = `$${(1500).toLocaleString("es-CL")}`;
		const p2 = `$${(2500).toLocaleString("es-CL")}`;
		const s1 = `$${(1500 * 2).toLocaleString("es-CL")}`;
		const s2 = `$${(2500 * 1).toLocaleString("es-CL")}`;

		// Puede haber múltiples coincidencias (precio y subtotal iguales para distintos campos),
		// por eso usamos getAllByText y verificamos que exista al menos una coincidencia.
		expect(screen.getAllByText(p1).length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText(p2).length).toBeGreaterThanOrEqual(1);

		expect(screen.getAllByText(s1).length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText(s2).length).toBeGreaterThanOrEqual(1);
	});
});

