import { render, screen } from '@testing-library/react';
import { expect, vi, describe, it } from 'vitest';

// Mock antd Tag to avoid coupling with Ant Design internals
vi.mock('antd', () => {
  const React = require('react');
  return {
    Tag: ({ children, color, ...rest }: any) =>
      React.createElement('span', { 'data-testid': 'ant-tag', 'data-color': color, ...rest }, children),
  };
});

import BadgeCategoria from '../BadgeCategoria';

describe('BadgeCategoria', () => {
  it('muestra la categoría pasada en children', () => {

    render(<BadgeCategoria categoria="Comida" />);
    expect(screen.getByText('Comida')).toBeInTheDocument();
  });

  it('usa el color por defecto cuando no se pasa `color`', () => {
    render(<BadgeCategoria categoria="Default" />);
    const tag = screen.getByTestId('ant-tag');
    expect(tag).toHaveAttribute('data-color', 'blue');
  });

  it('pasa el prop `color` al Tag de antd', () => {
    render(<BadgeCategoria categoria="Rojo" color="red" />);
    const tag = screen.getByTestId('ant-tag');
    expect(tag).toHaveAttribute('data-color', 'red');
  });
});
