import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock antd Card and Typography.Text
vi.mock('antd', () => {
  const React = require('react');
  return {
    Card: ({ children, style }: any) => React.createElement('div', { 'data-testid': 'ant-card', style }, children),
    Typography: {
      Text: ({ children, style }: any) => React.createElement('span', { 'data-testid': 'ant-text', style }, children),
    },
  };
});

// Mock the Titulo component used inside StatCard
vi.mock('componentes/atomos/Titulo', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children, nivel, style }: any) => React.createElement('h' + (nivel ?? 3), { 'data-testid': 'mock-titulo', style }, children),
  };
});

import StatCard from '../StatCard';

describe('StatCard', () => {
  it('renderiza el título y el valor (string)', () => {
    render(<StatCard title="Ventas" value="1.234" />);
    expect(screen.getByTestId('ant-card')).toBeInTheDocument();
    expect(screen.getByTestId('ant-text')).toHaveTextContent('Ventas');
    expect(screen.getByTestId('mock-titulo')).toHaveTextContent('1.234');
  });

  it('renderiza valor numérico y aplica nivel 4 en Titulo', () => {
    render(<StatCard title="Pedidos" value={987} />);
    expect(screen.getByTestId('ant-text')).toHaveTextContent('Pedidos');
    const titulo = screen.getByTestId('mock-titulo');
    expect(titulo).toHaveTextContent('987');
    // el mock crea un hN basado en el prop nivel; StatCard pasa nivel=4
    expect(titulo.tagName.toLowerCase()).toBe('h4');
  });
});
