import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock antd Tag to inspect props and rendered children
vi.mock('antd', () => {
  const React = require('react');
  return {
    Tag: ({ children, color, ...rest }: any) =>
      React.createElement('span', { 'data-testid': 'ant-tag', 'data-color': color, ...rest }, children),
  };
});

import BadgeStock from '../BadgeStock';

describe('BadgeStock', () => {
  it('muestra "Sin Stock" y color gris cuando stock es 0', () => {
    render(<BadgeStock stock={0} />);
    const tag = screen.getByTestId('ant-tag');
    expect(tag).toHaveTextContent('Sin Stock');
    expect(tag).toHaveAttribute('data-color', 'gray');
  });

  it('muestra cantidad y color rojo cuando stock < 10', () => {
    render(<BadgeStock stock={5} />);
    const tag = screen.getByTestId('ant-tag');
    expect(tag).toHaveTextContent('5 Bajo Stock');
    expect(tag).toHaveAttribute('data-color', 'red');
  });

  it('muestra "10 en Stock" y color rojo cuando stock es 10', () => {
    render(<BadgeStock stock={10} />);
    const tag = screen.getByTestId('ant-tag');
    expect(tag).toHaveTextContent('10 en Stock');
    expect(tag).toHaveAttribute('data-color', 'red');
  });

  it('muestra cantidad y color verde cuando stock es >30', () => {
    render(<BadgeStock stock={35} />);
    const tag = screen.getByTestId('ant-tag');
    expect(tag).toHaveTextContent('35 en Stock');
    expect(tag).toHaveAttribute('data-color', 'green');
  });

  it('muestra cantidad y color verde cuando stock > 50', () => {
    render(<BadgeStock stock={100} />);
    const tag = screen.getByTestId('ant-tag');
    expect(tag).toHaveTextContent('100 en Stock');
    expect(tag).toHaveAttribute('data-color', 'green');
  });
});
