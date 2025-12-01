import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// mock react-router useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock antd Menu to render provided items as buttons
vi.mock('antd', () => {
  const React = require('react');
  return {
    Menu: ({ items, onClick }: any) =>
      React.createElement(
        'nav',
        { 'data-testid': 'ant-menu' },
        (items || []).map((it: any) =>
          React.createElement(
            'button',
            {
              key: it.key,
              'data-key': it.key,
              onClick: () => onClick && onClick({ key: it.key }),
            },
            it.label
          )
        )
      ),
  };
});

// Mock icons to simple spans
vi.mock('@ant-design/icons', () => {
  const React = require('react');
  return {
    DashboardOutlined: () => React.createElement('span', { 'data-testid': 'icon-dashboard' }),
    ShoppingCartOutlined: () => React.createElement('span', { 'data-testid': 'icon-cart' }),
    OrderedListOutlined: () => React.createElement('span', { 'data-testid': 'icon-list' }),
  };
});

import MenuVendedor from '../MenuVendedor';

describe('MenuVendedor', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('renderiza las opciones del menú', () => {
    render(<MenuVendedor />);
    const menu = screen.getByTestId('ant-menu');
    expect(menu).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Órdenes')).toBeInTheDocument();
  });

  it('navega a la ruta correcta al hacer click en cada opción', () => {
    render(<MenuVendedor />);
    const btnDashboard = screen.getByText('Dashboard');
    const btnProductos = screen.getByText('Productos');
    const btnOrdenes = screen.getByText('Órdenes');

    fireEvent.click(btnDashboard);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');

    fireEvent.click(btnProductos);
    expect(mockNavigate).toHaveBeenCalledWith('/productos');

    fireEvent.click(btnOrdenes);
    expect(mockNavigate).toHaveBeenCalledWith('/ordenes');
  });
});
