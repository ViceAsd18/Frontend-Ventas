import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock antd Tag (used by the component) to assert props passed
vi.mock('antd', () => {
  const React = require('react');
  return {
    Tag: ({ color, children, ...rest }: any) =>
      React.createElement('span', { 'data-testid': 'ant-tag', 'data-color': color, ...rest }, children),
  };
});

import BadgeEstado from '../BadgeEstado';

describe('BadgeEstado', () => {
  it('muestra texto en mayúsculas y color orange para `pendiente`', () => {
    render(<BadgeEstado estado="pendiente" />);
    const tag = screen.getByTestId('ant-tag');
    expect(tag).toHaveAttribute('data-color', 'orange');
    expect(tag).toHaveTextContent('PENDIENTE');
  });

  it('muestra texto en mayúsculas y color green para `completada`', () => {
    render(<BadgeEstado estado="completada" />);
    const tag = screen.getByTestId('ant-tag');
    expect(tag).toHaveAttribute('data-color', 'green');
    expect(tag).toHaveTextContent('COMPLETADA');
  });

  it('muestra texto en mayúsculas y color red para `cancelada`', () => {
    render(<BadgeEstado estado="cancelada" />);
    const tag = screen.getByTestId('ant-tag');
    expect(tag).toHaveAttribute('data-color', 'red');
    expect(tag).toHaveTextContent('CANCELADA');
  });
});
