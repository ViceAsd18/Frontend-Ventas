import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock antd to avoid rendering its internals
vi.mock('antd', () => {
  const React = require('react');
  return {
    Card: ({ children }: any) => React.createElement('div', { 'data-testid': 'ant-card' }, children),
    Row: ({ children }: any) => React.createElement('div', null, children),
    Col: ({ children }: any) => React.createElement('div', null, children),
    Button: ({ children, onClick, disabled }: any) =>
      React.createElement('button', { 'data-testid': 'ant-button', onClick, disabled }, children),
    Tag: ({ children }: any) => React.createElement('span', { 'data-testid': 'ant-tag' }, children),
  };
});

// Mock Imagen and BadgeStock local components
vi.mock('../../../atomos/ImagenProducto', () => ({
  __esModule: true,
  default: ({ src, alt }: any) => React.createElement('img', { 'data-testid': 'imagen', src, alt }),
}));

vi.mock('../../../atomos/BadgeStock', () => ({
  __esModule: true,
  default: ({ stock }: any) => React.createElement('span', { 'data-testid': 'badge-stock', 'data-stock': String(stock) }, String(stock)),
}));

import CardProductoCliente from '../CardProductoCliente';

const productoBase = {
  id_producto: 42,
  nombre_producto: 'Mi Producto Genial',
  precio: 12345,
  stock: 5,
  categoria: { nombre_categoria: 'Comida' },
};

describe('CardProductoCliente', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('renderiza nombre, categoria, precio y badge de stock', () => {
    render(<CardProductoCliente producto={productoBase as any} />);
    expect(screen.getByText('Mi Producto Genial')).toBeInTheDocument();
    expect(screen.getByTestId('ant-tag')).toHaveTextContent('Comida');
    // precio formateado con toLocaleString('es-CL')
    expect(screen.getByText(`$${productoBase.precio.toLocaleString('es-CL')}`)).toBeInTheDocument();
    const badge = screen.getByTestId('badge-stock');
    expect(badge).toHaveAttribute('data-stock', String(productoBase.stock));
  });

  it('construye la ruta de la imagen a partir del nombre del producto', () => {
    render(<CardProductoCliente producto={productoBase as any} />);
    const img = screen.getByTestId('imagen') as HTMLImageElement;
    // nombre_producto -> mi_producto_genial
    expect(img.src).toContain('/assets/img/productos/mi_producto_genial.jpg');
    expect(img.alt).toBe(productoBase.nombre_producto);
  });

  it('usa "General" cuando no hay nombre de categoria', () => {
    const p = { ...productoBase, categoria: {} };
    render(<CardProductoCliente producto={p as any} />);
    expect(screen.getByTestId('ant-tag')).toHaveTextContent('General');
  });

  it('deshabilita el botón cuando stock es 0 y navega al detalle si hay stock', () => {
    const p0 = { ...productoBase, stock: 0 };
    const { rerender } = render(<CardProductoCliente producto={p0 as any} />);
    const btn = screen.getByTestId('ant-button') as HTMLButtonElement;
    expect(btn).toBeDisabled();

    // re-render with stock > 0 and click
    rerender(<CardProductoCliente producto={productoBase as any} />);
    const btn2 = screen.getByTestId('ant-button');
    fireEvent.click(btn2);
    expect(mockNavigate).toHaveBeenCalledWith(`/cliente/producto/${productoBase.id_producto}`);
  });
});
