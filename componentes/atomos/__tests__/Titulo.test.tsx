import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

// Mock antd Typography Title to a heading element we can inspect
vi.mock('antd', () => {
  const React = require('react');
  return {
    Typography: {
      Title: ({ level, children, style }: any) =>
        React.createElement('h' + (level ?? 3), { 'data-testid': 'ant-title', style }, children),
    },
  };
});

import Titulo from '../Titulo';

describe('Titulo', () => {
  it('renderiza children y usa nivel por defecto (3)', () => {
    render(<Titulo>Hola Mundo</Titulo>);
    const title = screen.getByTestId('ant-title');
    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toBe('h3');
    expect(title).toHaveTextContent('Hola Mundo');
  });

  it('respeta el prop `nivel` y aplica estilos pasados', () => {
    render(
      <Titulo nivel={1} style={{ color: 'purple' }}>
        Principal
      </Titulo>
    );
    const title = screen.getByTestId('ant-title');
    expect(title.tagName.toLowerCase()).toBe('h1');
    // jsdom normaliza colores a rgb
    expect(getComputedStyle(title).color).toBe('rgb(128, 0, 128)');
    expect(title).toHaveTextContent('Principal');
  });
});
