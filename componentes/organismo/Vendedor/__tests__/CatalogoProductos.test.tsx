import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

// Mock CardProducto to render a button that calls onVerDetalle with the producto prop
vi.mock('componentes/moleculas/Vendedor/CardProductos', () => ({
  __esModule: true,
  default: ({ producto, onVerDetalle }: any) => (
    <div data-testid="card-producto">
      <span>{producto.nombre_producto}</span>
      <button onClick={() => onVerDetalle && onVerDetalle(producto)}>Ver</button>
    </div>
  ),
}));

import CatalogoProductos from '../CatalogoProductos';

describe('CatalogoProductos', () => {
  test('renderiza lista de productos y propaga onVerDetalle', () => {
    const productos = [
      { id_producto: 1, nombre_producto: 'A' },
      { id_producto: 2, nombre_producto: 'B' },
    ];

    const onVerDetalle = vi.fn();
    const onEditarProducto = vi.fn();

    render(
      <CatalogoProductos productos={productos as any} onVerDetalle={onVerDetalle} onEditarProducto={onEditarProducto} />
    );

    const cards = screen.getAllByTestId('card-producto');
    expect(cards).toHaveLength(2);

    // Click first product's button
    const firstButton = screen.getAllByRole('button', { name: /Ver/i })[0];
    fireEvent.click(firstButton);

    expect(onVerDetalle).toHaveBeenCalledTimes(1);
    expect(onVerDetalle).toHaveBeenCalledWith(expect.objectContaining({ id_producto: 1, nombre_producto: 'A' }));
  });
});
