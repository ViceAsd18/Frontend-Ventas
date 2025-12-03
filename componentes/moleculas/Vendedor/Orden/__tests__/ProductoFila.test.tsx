import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock antd layout components
vi.mock('antd', () => {
  const React = require('react');
  const Typography = { Text: (props: any) => React.createElement('span', props, props.children) };

  return {
    __esModule: true,
    Typography,
    Row: ({ children, style }: any) => React.createElement('div', { 'data-testid': 'ant-row', style }, children),
    Col: ({ children, style }: any) => React.createElement('div', { 'data-testid': 'ant-col', style }, children),
    Space: ({ children }: any) => React.createElement('div', { 'data-testid': 'ant-space' }, children),
  };
});

// Mock atom components used inside ProductoFila
vi.mock('componentes/atomos/Boton', () => {
  const React = require('react');
  function BotonMock({ children, onClick, color }: any) {
    return React.createElement('button', { 'data-testid': 'boton', onClick, style: { backgroundColor: color } }, children);
  }
  return { __esModule: true, default: BotonMock };
});

vi.mock('componentes/atomos/ImagenProducto', () => {
  const React = require('react');
  function ImgMock({ src, alt, style }: any) {
    return React.createElement('img', { 'data-testid': 'imagen-producto', src, alt, style });
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
  function BadgeCatMock({ categoria, color }: any) {
    return React.createElement('span', { 'data-testid': 'badge-categoria' }, categoria);
  }
  return { __esModule: true, default: BadgeCatMock };
});

import ProductoFila from '../ProductoFila';

describe('ProductoFila', () => {
  const producto = {
    id_producto: 1,
    nombre_producto: 'Camisa Azul',
    precio: 19990,
    stock: 5,
    categoria: { nombre_categoria: 'Ropa' },
  } as any;

  it('renderiza imagen, nombre, categoria, stock y precio formateado', () => {
    render(<ProductoFila producto={producto} onAgregar={() => {}} />);

    // Imagen con nombre normalizado
    const img = screen.getByTestId('imagen-producto') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/assets/img/productos/camisa_azul.jpg');

    // Nombre y precio
    expect(screen.getByText('Camisa Azul')).toBeInTheDocument();
    expect(screen.getByText(`$${producto.precio.toFixed(2)}`)).toBeInTheDocument();

    // Badges
    expect(screen.getByTestId('badge-categoria')).toHaveTextContent('Ropa');
    expect(screen.getByTestId('badge-stock')).toHaveTextContent('stock:5');
  });

  it('llama onAgregar con cantidad 1 al hacer click en Agregar', () => {
    const onAgregar = vi.fn();
    render(<ProductoFila producto={producto} onAgregar={onAgregar} />);

    const boton = screen.getByTestId('boton');
    fireEvent.click(boton);
    expect(onAgregar).toHaveBeenCalledWith(producto, 1);
  });
});
