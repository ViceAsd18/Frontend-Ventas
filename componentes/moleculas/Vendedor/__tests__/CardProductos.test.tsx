import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

// Mock antd components used in CardProducto
vi.mock('antd', () => {
  const React = require('react');
  return {
    __esModule: true,
    Card: ({ children }: any) => React.createElement('div', { 'data-testid': 'ant-card' }, children),
    Row: ({ children }: any) => React.createElement('div', { 'data-testid': 'ant-row' }, children),
    Col: ({ children }: any) => React.createElement('div', { 'data-testid': 'ant-col' }, children),
    Button: ({ children, onClick, disabled }: any) => React.createElement('button', { 'data-testid': 'ant-button', onClick, disabled }, children),
  };
});

// Mock atom components
vi.mock('componentes/atomos/ImagenProducto', () => {
  const React = require('react');
  function ImgMock({ src, alt }: any) {
    return React.createElement('img', { 'data-testid': 'imagen-producto', src, alt });
  }
  return { __esModule: true, default: ImgMock };
});

vi.mock('componentes/atomos/BadgeStock', () => {
  const React = require('react');
  function BadgeStockMock({ stock }: any) {
    return React.createElement('span', { 'data-testid': 'badge-stock' }, `stock:${stock}`);
  }
  return { __esModule: true, default: BadgeStockMock };
});

vi.mock('componentes/atomos/BadgeCategoria', () => {
  const React = require('react');
  function BadgeCatMock({ categoria }: any) {
    return React.createElement('span', { 'data-testid': 'badge-categoria' }, categoria);
  }
  return { __esModule: true, default: BadgeCatMock };
});

import CardProducto from '../CardProductos';

describe('CardProducto', () => {
  const producto = {
    id_producto: 10,
    nombre_producto: 'Producto Demo',
    precio: 29990,
    stock: 3,
    categoria: { nombre_categoria: 'DemoCat' },
  } as any;

  it('renderiza imagen, nombre, badges y precio, y llama onVerDetalle al click cuando hay stock', () => {
    const onVerDetalle = vi.fn();
    render(<CardProducto producto={producto} onVerDetalle={onVerDetalle} />);

    // Imagen usa nombre normalizado
    const img = screen.getByTestId('imagen-producto') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/assets/img/productos/producto_demo.jpg');

    // Nombre
    expect(screen.getByText('Producto Demo')).toBeInTheDocument();

    // Badges
    expect(screen.getByTestId('badge-categoria')).toHaveTextContent('DemoCat');
    expect(screen.getByTestId('badge-stock')).toHaveTextContent('stock:3');

    // Precio contiene la parte numérica (formatos locales pueden variar)
    const precio = screen.getByText((content) => content.startsWith('$') && /29990|29\.990/.test(content));
    expect(precio).toBeTruthy();

    // Botón está habilitado y llama handler
    const boton = screen.getByTestId('ant-button');
    expect(boton).toBeEnabled();
    fireEvent.click(boton);
    expect(onVerDetalle).toHaveBeenCalledWith(producto);
  });

  it('deshabilita el botón cuando stock es 0', () => {
    const onVerDetalle = vi.fn();
    const sinStock = { ...producto, stock: 0 } as any;
    render(<CardProducto producto={sinStock} onVerDetalle={onVerDetalle} />);

    const boton = screen.getByTestId('ant-button');
    expect(boton).toBeDisabled();
    fireEvent.click(boton);
    expect(onVerDetalle).not.toHaveBeenCalled();
  });
});
