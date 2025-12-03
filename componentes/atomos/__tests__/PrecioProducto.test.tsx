import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import PrecioProducto from '../PrecioProducto';

describe('PrecioProducto', () => {
  it('muestra el valor con 2 decimales y signo de peso', () => {
    render(<PrecioProducto valor={123.4} />);
    expect(screen.getByText('$123.40')).toBeInTheDocument();
  });

  it('aplica estilos por defecto (normal): fontSize 14, fontWeight 400 y color #000', () => {
    render(<PrecioProducto valor={10} />);
    const el = screen.getByText('$10.00');
    expect(el).toHaveStyle({ fontSize: '14px', fontWeight: '400', color: '#000' });
  });

  it('aplica estilos cuando `tipo` es destacado', () => {
    render(<PrecioProducto valor={99.99} tipo="destacado" />);
    const el = screen.getByText('$99.99');
    expect(el).toHaveStyle({ fontSize: '24px', fontWeight: '500' });
  });

  it('permite sobrescribir el color mediante la prop `color`', () => {
    render(<PrecioProducto valor={1} color="red" />);
    const el = screen.getByText('$1.00');
    // jsdom normaliza colores a rgb(...) en getComputedStyle
    expect(window.getComputedStyle(el).color).toBe('rgb(255, 0, 0)');
  });
});
