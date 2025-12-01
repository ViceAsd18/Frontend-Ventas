import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock antd Image to a simple img so we can inspect props and styles
vi.mock('antd', () => {
  const React = require('react');
  return {
    Image: ({ src, alt, width, height, style, preview, fallback }: any) =>
      React.createElement('img', {
        'data-testid': 'ant-image',
        src,
        alt,
        'data-width': width,
        'data-height': height,
        style,
        'data-preview': preview ? 'true' : 'false',
        'data-fallback': fallback,
      }),
  };
});

import Imagen from '../ImagenProducto';

describe('ImagenProducto', () => {
  it('renderiza con valores por defecto (alt y dimensiones)', () => {
    render(<Imagen src="/img/producto.jpg" />);
    const img = screen.getByTestId('ant-image');
    expect(img).toHaveAttribute('src', '/img/producto.jpg');
    expect(img).toHaveAttribute('alt', 'Imagen');
    expect(img).toHaveAttribute('data-width', '100%');
    expect(img).toHaveAttribute('data-height', '100%');
    expect(img).toHaveStyle('border-radius: 8px');
    expect(img).toHaveStyle('object-fit: cover');
    // fallback presente
    expect(img).toHaveAttribute('data-fallback', 'https://via.placeholder.com/150?text=Sin+Imagen');
  });

  it('acepta alt y dimensiones personalizadas y permite sobreescribir estilos', () => {
    render(
      <Imagen
        src="/img/otro.jpg"
        alt="Producto"
        width={200}
        height={150}
        style={{ borderRadius: 0 }}
      />
    );
    const img = screen.getByTestId('ant-image');
    expect(img).toHaveAttribute('src', '/img/otro.jpg');
    expect(img).toHaveAttribute('alt', 'Producto');
    expect(img).toHaveAttribute('data-width', '200');
    expect(img).toHaveAttribute('data-height', '150');
    // jsdom can normalize '0' or '0px' — comprobamos el valor computado
    const br = getComputedStyle(img).borderRadius;
    expect(['0px', '0']).toContain(br);
    // objectFit sigue presente ya que la prop se añadió antes del spread
    expect(img).toHaveStyle('object-fit: cover');
  });
});
