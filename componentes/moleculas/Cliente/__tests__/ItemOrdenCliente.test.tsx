import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock BadgeEstado
vi.mock('componentes/atomos/BadgeEstado', () => ({
  __esModule: true,
  default: ({ estado }: any) => React.createElement('span', { 'data-testid': 'badge-estado' }, estado),
}));

// Mock Boton
vi.mock('componentes/atomos/Boton', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => React.createElement('button', { ...props, 'data-testid': 'boton' }, children),
}));

import ItemOrdenCliente from '../ItemOrdenCliente';

describe('ItemOrdenCliente', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('renderiza id, fecha, total y estado', () => {
    const orden = {
      id_venta: 123,
      fecha_venta: '2025-12-02T10:00:00Z',
      total: 15990,
      estado: 'pendiente',
    } as any;

    render(<ItemOrdenCliente orden={orden} />);

    // ID
    expect(screen.getByText(`#${orden.id_venta}`)).toBeInTheDocument();

    // Fecha (usar la misma localización que el componente)
    const expectedDate = new Date(orden.fecha_venta).toLocaleDateString('es-CL');
    expect(screen.getByText(expectedDate)).toBeInTheDocument();

    // Total
    const expectedTotal = `$${orden.total.toLocaleString('es-CL')}`;
    expect(screen.getByText(expectedTotal)).toBeInTheDocument();

    // BadgeEstado renderizado con estado
    const badge = screen.getByTestId('badge-estado');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('pendiente');
  });

  it('navega al detalle cuando se hace click en Ver detalle', () => {
    const orden = { id_venta: 42, fecha_venta: Date.now(), total: 1000, estado: 'completado' } as any;
    render(<ItemOrdenCliente orden={orden} />);

    const boton = screen.getByTestId('boton');
    expect(boton).toBeInTheDocument();
    fireEvent.click(boton);

    expect(mockNavigate).toHaveBeenCalledWith(`/cliente/orden/${orden.id_venta}`);
  });
});
