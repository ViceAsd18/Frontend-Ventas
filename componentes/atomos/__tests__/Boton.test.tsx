import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock antd Button to inspect props and simulate clicks
vi.mock('antd', () => {
  const React = require('react');
  return {
    Button: ({ children, onClick, style, ...rest }: any) =>
      React.createElement(
        'button',
        { 'data-testid': 'ant-button', onClick, style, ...rest },
        children
      ),
  };
});

import Boton from '../Boton';

describe('Boton', () => {
  it('renderiza children correctamente', () => {
    render(<Boton>Click me</Boton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('ejecuta onClick cuando se hace click', () => {
    const handle = vi.fn();
    render(<Boton onClick={handle}>Presionar</Boton>);
    fireEvent.click(screen.getByTestId('ant-button'));
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('aplica la prop `color` como backgroundColor y preserva estilos pasados', () => {
    render(
      <Boton style={{ padding: 4 }} color="purple">
        Estilo
      </Boton>
    );
    const btn = screen.getByTestId('ant-button');
    // jsdom normaliza colores a rgb, comprobamos el valor computado
    expect(getComputedStyle(btn).backgroundColor).toBe('rgb(128, 0, 128)');
    expect(btn).toHaveStyle('padding: 4px');
    // jsdom normaliza colores a rgb, comprobamos el valor computado
    expect(getComputedStyle(btn).color).toBe('rgb(255, 255, 255)');
  });
});
