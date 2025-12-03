import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ItemProductoOrden from '../ItemProductoOrden';

describe('ItemProductoOrden', () => {
  it('muestra la imagen con src y alt y el nombre del producto', () => {
    const imagen = 'https://example.com/img.png';
    const nombre = 'Producto de prueba';

    render(<ItemProductoOrden imagen={imagen} nombre={nombre} />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect((img as HTMLImageElement).src).toBe(imagen);
    expect((img as HTMLImageElement).alt).toBe(nombre);

    // nombre
    expect(screen.getByText(nombre)).toBeInTheDocument();
  });

  it('tiene un contenedor para la imagen con estilos inline', () => {
    const imagen = 'https://example.com/img2.png';
    const nombre = 'Otro producto';
    const { container } = render(<ItemProductoOrden imagen={imagen} nombre={nombre} />);

    const img = container.querySelector('img');
    expect(img).toBeTruthy();
    const cont = img?.parentElement;
    expect(cont).toBeTruthy();
    const styleAttr = (cont as Element).getAttribute('style') || '';
    expect(styleAttr).toContain('border');
  });
});
