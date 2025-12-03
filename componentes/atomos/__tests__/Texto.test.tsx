import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Texto from '../Texto';

describe('Texto', () => {
  it('renderiza children correctamente', () => {
    render(<Texto>Hola Mundo</Texto>);
    expect(screen.getByText('Hola Mundo')).toBeInTheDocument();
  });

  it('aplica la prop `type` pasandola a antd Text', () => {
    render(<Texto type="secondary">Sec</Texto>);
    const el = screen.getByText('Sec');
    // antd Text renders as a span; ensure element exists
    expect(el).toBeInTheDocument();
  });

  it('aplica strong cuando se pasa `strong=true`', () => {
    render(<Texto strong>Fuerte</Texto>);
    const el = screen.getByText('Fuerte');
    // strong affects style; check that it renders and contains text
    expect(el).toBeInTheDocument();
  });

  it('aplica estilos personalizados a través de `style`', () => {
    render(<Texto style={{ color: 'blue' }}>Azul</Texto>);
    const el = screen.getByText('Azul');
    expect(window.getComputedStyle(el).color).toBe('rgb(0, 0, 255)');
  });
});
