import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock antd Card, Row and Space to make rendering deterministic
vi.mock('antd', () => {
  const React = require('react');
  return {
    __esModule: true,
    Card: ({ children, title }: any) => React.createElement('div', { 'data-testid': 'ant-card' }, React.createElement('h2', {}, title), children),
    Space: ({ children }: any) => React.createElement('div', { 'data-testid': 'ant-space' }, children),
    Row: ({ children }: any) => React.createElement('div', { 'data-testid': 'ant-row' }, children),
  };
});

import ResumenTotales from '../ResumenTotales';

describe('ResumenTotales', () => {
  it('muestra subtotal, impuesto y total con formato local', () => {
    render(<ResumenTotales subtotal={1000} impuesto={190} total={1190} />);

    // Card title
    expect(screen.getByText('Resumen de Totales')).toBeInTheDocument();

    // Subtotal e impuesto con formato es-CL (puntos como separador de miles)
    expect(screen.getByText('$1.000')).toBeInTheDocument();
    expect(screen.getByText('$190')).toBeInTheDocument();

    // Total en negrita
    expect(screen.getByText('$1.190')).toBeInTheDocument();
  });

  it('muestra valores grandes con separador de miles', () => {
    render(<ResumenTotales subtotal={1234567} impuesto={234567} total={1469134} />);

    expect(screen.getByText('$1.234.567')).toBeInTheDocument();
    expect(screen.getByText('$234.567')).toBeInTheDocument();
    expect(screen.getByText('$1.469.134')).toBeInTheDocument();
  });
});
