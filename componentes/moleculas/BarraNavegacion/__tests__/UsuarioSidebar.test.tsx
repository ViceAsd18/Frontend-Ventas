import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock useNavigate from react-router
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock useAuth from auth/AuthContext
vi.mock('auth/AuthContext', () => ({
  useAuth: () => ({ user: { email: 'user@example.com', rol: 'vendedor' } }),
}));

// Mock antd Avatar and Dropdown to inspect props and render menu items
vi.mock('antd', () => {
  const React = require('react');
  return {
    Avatar: ({ children, size, style }: any) =>
      React.createElement('span', { 'data-testid': 'ant-avatar', 'data-size': String(size), style }, children),
    Dropdown: ({ children, menu }: any) =>
      React.createElement(
        'div',
        { 'data-testid': 'ant-dropdown' },
        // render the children
        children,
        // render menu items as buttons so tests can click them
        React.createElement(
          'div',
          { 'data-testid': 'ant-dropdown-menu' },
          ...(menu?.items || []).map((it: any) =>
            React.createElement(
              'button',
              { key: it.key, 'data-key': it.key, onClick: it.onClick },
              it.label
            )
          )
        )
      ),
  };
});

// Mock icon
vi.mock('@ant-design/icons', () => ({
  LogoutOutlined: () => React.createElement('span', { 'data-testid': 'icon-logout' }),
}));

import UsuarioSidebar from '../UsuarioSidebar';

describe('UsuarioSidebar', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    localStorage.clear();
  });

  it('muestra avatar, email y rol cuando no está colapsado', () => {
    render(<UsuarioSidebar colapsado={false} />);
    const avatar = screen.getByTestId('ant-avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('data-size', '58');
    expect(screen.getByText('user@example.com')).toBeInTheDocument();
    expect(screen.getByText('vendedor')).toBeInTheDocument();
  });

  it('muestra avatar compacto cuando está colapsado y no muestra email/rol', () => {
    render(<UsuarioSidebar colapsado={true} />);
    const avatar = screen.getByTestId('ant-avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('data-size', '48');
    expect(screen.queryByText('user@example.com')).toBeNull();
    expect(screen.queryByText('vendedor')).toBeNull();
  });

  it('al hacer click en "Cerrar sesión" navega a /login y borra token y user del localStorage', () => {
    // preparar localStorage
    localStorage.setItem('token', 'abc');
    localStorage.setItem('user', JSON.stringify({ email: 'user@example.com' }));

    render(<UsuarioSidebar />);
    // encontrar el botón del menu que renderiza el mock
    const cerrarBtn = screen.getByText('Cerrar sesión');
    expect(cerrarBtn).toBeInTheDocument();
    fireEvent.click(cerrarBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
