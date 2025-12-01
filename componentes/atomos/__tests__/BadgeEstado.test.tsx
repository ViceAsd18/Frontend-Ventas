import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock antd Badge to assert props passed
vi.mock('antd', () => {
  const React = require('react');
  return {
    Badge: ({ color, text, ...rest }: any) =>
      React.createElement('span', { 'data-testid': 'ant-badge', 'data-color': color, 'data-text': text, ...rest }, text),
  };
});

import BadgeEstado from '../BadgeEstado';

describe('BadgeEstado', () => {
  it('muestra texto en mayúsculas y color orange para `pendiente`', () => {
    render(<BadgeEstado estado="pendiente" />);
    const badge = screen.getByTestId('ant-badge');
    expect(badge).toHaveAttribute('data-color', 'orange');
    expect(badge).toHaveAttribute('data-text', 'PENDIENTE');
  });

  it('muestra texto en mayúsculas y color green para `completada`', () => {
    render(<BadgeEstado estado="completada" />);
    const badge = screen.getByTestId('ant-badge');
    expect(badge).toHaveAttribute('data-color', 'green');
    expect(badge).toHaveAttribute('data-text', 'COMPLETADA');
  });

  it('muestra texto en mayúsculas y color red para `cancelada`', () => {
    render(<BadgeEstado estado="cancelada" />);
    const badge = screen.getByTestId('ant-badge');
    expect(badge).toHaveAttribute('data-color', 'red');
    expect(badge).toHaveAttribute('data-text', 'CANCELADA');
  });
});
