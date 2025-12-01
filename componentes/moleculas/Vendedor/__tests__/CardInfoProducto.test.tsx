import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock antd components used by CardInfoProducto
vi.mock('antd', () => {
  const React = require('react');
  return {
    __esModule: true,
    Card: ({ children }: any) => React.createElement('div', { 'data-testid': 'ant-card' }, children),
    Typography: {
      Text: ({ children, type, strong, style }: any) => React.createElement('span', { 'data-testid': 'ant-text', 'data-type': type ?? '', 'data-strong': strong ? 'true' : 'false', style }, children),
    },
    Space: ({ children }: any) => React.createElement('div', { 'data-testid': 'ant-space' }, children),
  };
});

// Mock atom components
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

vi.mock('componentes/atomos/Titulo', () => {
  const React = require('react');
  function TituloMock({ children, nivel = 3 }: any) {
    const Tag = `h${nivel}` as any;
    return React.createElement(Tag, { 'data-testid': 'titulo' }, children);
  }
  return { __esModule: true, default: TituloMock };
});

import CardInfoProducto from '../CardInfoProducto';

describe('CardInfoProducto', () => {
  it('renderiza la información del producto incluyendo SKU, marca y proveedor', () => {
    const producto = {
      nombre_producto: 'Zapato Test',
      categoria: { nombre_categoria: 'Calzado' },
      stock: 12,
      precio: 49990,
      descripcion_producto: 'Descripción de prueba',
      sku: 'SKU123',
      marca: 'MarcaX',
      proveedor: 'ProveedorY',
    } as any;

    render(<CardInfoProducto producto={producto} />);

    // Titulo con nombre (hay más de un `Titulo` en el componente, tomar el primero)
    const titulos = screen.getAllByTestId('titulo');
    expect(titulos.length).toBeGreaterThanOrEqual(1);
    expect(titulos[0]).toHaveTextContent('Zapato Test');

    // Badges
    expect(screen.getByTestId('badge-categoria')).toHaveTextContent('Calzado');
    expect(screen.getByTestId('badge-stock')).toHaveTextContent('stock:12');

    // Precio formateado (puede variar por locale, comprobamos que contiene parte numerica)
    const precioText = screen.getByText((content, node) => content.startsWith('$') && content.includes('49990') || content.includes('49.990'));
    expect(precioText).toBeTruthy();

    // Descripción
    expect(screen.getByText('Descripción de prueba')).toBeInTheDocument();

    // Detalles adicionales
    expect(screen.getByText('SKU:')).toBeInTheDocument();
    expect(screen.getByText('SKU123')).toBeInTheDocument();
    expect(screen.getByText('Marca:')).toBeInTheDocument();
    expect(screen.getByText('MarcaX')).toBeInTheDocument();
    expect(screen.getByText('Proveedor:')).toBeInTheDocument();
    expect(screen.getByText('ProveedorY')).toBeInTheDocument();
  });

  it('muestra N/A si no hay SKU', () => {
    const producto = {
      nombre_producto: 'Sin SKU',
      categoria: { nombre_categoria: 'Var' },
      stock: 0,
      precio: 1000,
      descripcion_producto: 'Sin sku desc',
      sku: null,
      marca: 'M',
      proveedor: 'P',
    } as any;

    render(<CardInfoProducto producto={producto} />);

    expect(screen.getByText('SKU:')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});
