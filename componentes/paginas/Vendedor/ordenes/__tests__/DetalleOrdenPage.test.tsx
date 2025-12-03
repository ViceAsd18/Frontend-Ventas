import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock react-router useParams
vi.mock('react-router', () => ({ useParams: () => ({ id: '42' }) }));

// Mock Titulo (componente atómico utilizado en la página)
vi.mock('componentes/atomos/Titulo', () => ({ __esModule: true, default: ({ children }: any) => <h1>{children}</h1> }));

// Mock services/orden and expose getOrdenes as a mock fn
vi.mock('services/orden', () => {
  const getOrdenes = vi.fn();
  return { __esModule: true, getOrdenes };
});

// Mock VendedorLayout
vi.mock('componentes/layout/VendedorLayout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

// Mock BadgeEstado
vi.mock('componentes/atomos/BadgeEstado', () => ({
  __esModule: true,
  default: ({ estado }: any) => <span data-testid="badge">{estado}</span>,
}));

// Mock ResumenTotales
vi.mock('componentes/moleculas/Vendedor/ResumenTotales', () => ({
  __esModule: true,
  default: ({ subtotal, impuesto, total }: any) => (
    <div data-testid="resumen">S:{subtotal} I:{impuesto} T:{total}</div>
  ),
}));

// Mock TablaProductoDetalle
vi.mock('componentes/organismo/Vendedor/TablaProductoDetalle', () => ({
  __esModule: true,
  default: ({ detalles }: any) => (
    <div data-testid="tabla">
      {detalles.map((d: any) => (
        <div key={d.id_detalle} data-testid={`row-${d.id_detalle}`}>
          {d.producto?.nombre_producto ?? d.nombre}
        </div>
      ))}
    </div>
  ),
}));

import DetalleOrdenPage from '../DetalleOrdenPage';
import { getOrdenes } from 'services/orden';

describe('DetalleOrdenPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('muestra mensaje cuando la orden no se encuentra', async () => {
    (getOrdenes as any).mockResolvedValue([]);

    render(<DetalleOrdenPage />);

    expect(await screen.findByText('Orden no encontrada')).toBeInTheDocument();
  });

  test('muestra detalles de la orden cuando se encuentra', async () => {
    const orden = {
      id_venta: 42,
      usuario: { nombre: 'Cliente Test' },
      fecha_venta: '2025-11-01T00:00:00.000Z',
      estado: 'Pendiente',
      detalles: [
        { id_detalle: 1, producto: { nombre_producto: 'Producto X', precio: 1000 }, cantidad: 2, subtotal: 2000 },
      ],
    } as any;

    (getOrdenes as any).mockResolvedValue([orden]);

    render(<DetalleOrdenPage />);

    expect(await screen.findByText('Orden #42')).toBeInTheDocument();
    expect(screen.getByTestId('badge')).toHaveTextContent('Pendiente');
    expect(screen.getByText(/Cliente: Cliente Test/)).toBeInTheDocument();

    // El formato de fecha puede variar en jsdom; comprobamos día y año de forma flexible
    const dateNode = screen.getByText((content) => content.includes('31') && content.includes('2025'));
    expect(dateNode).toBeInTheDocument();

    // tabla y resumen
    expect(screen.getByTestId('tabla')).toBeInTheDocument();
    expect(screen.getByTestId('row-1')).toHaveTextContent('Producto X');
    expect(screen.getByTestId('resumen')).toBeInTheDocument();
  });
});
