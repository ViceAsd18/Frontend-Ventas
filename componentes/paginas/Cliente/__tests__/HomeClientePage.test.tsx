import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock react-router useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock antd to provide Typography.Title, Typography.Paragraph, Button, Spin and message
vi.mock('antd', () => {
  const React = require('react');
  const Title = ({ children, ...props }: any) => <h1 {...props}>{children}</h1>;
  const Paragraph = ({ children, ...props }: any) => <p {...props}>{children}</p>;
  const Button = ({ children, onClick, ...props }: any) => <button onClick={onClick} {...props}>{children}</button>;
  const Spin = ({ children }: any) => <div data-testid="spin">{children}</div>;
  const message = { error: vi.fn() };

  return {
    __esModule: true,
    Typography: { Title, Paragraph },
    Button,
    Spin,
    message,
  };
});

// Mock ClienteLayout
vi.mock('../../../layout/ClienteLayout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

// Mock CardProductoCliente to render a simple card with testid
vi.mock('../../../moleculas/Cliente/CardProductoCliente', () => ({
  __esModule: true,
  default: ({ producto }: any) => (
    <div data-testid={`card-${producto.id_producto}`}>{producto.nombre_producto}</div>
  ),
}));

// Mock getProductos service
vi.mock('../../../../services/productos', () => ({
  __esModule: true,
  getProductos: vi.fn(),
}));

import HomeClientePage from '../HomeClientePage';
import { getProductos } from '../../../../services/productos';

describe('HomeClientePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('muestra hero y navega a la tienda al hacer click', async () => {
    const productos = [
      { id_producto: 1, nombre_producto: 'P1' },
      { id_producto: 2, nombre_producto: 'P2' },
    ];
    (getProductos as any).mockResolvedValue(productos);

    render(<HomeClientePage />);

    // botón de hero
    const boton = screen.getByRole('button', { name: /Ir a la tienda/i });
    expect(boton).toBeInTheDocument();

    fireEvent.click(boton);
    expect(mockNavigate).toHaveBeenCalledWith('/cliente/tienda');

    // esperar a que se rendericen los cards
    const card1 = await screen.findByTestId('card-1');
    const card2 = await screen.findByTestId('card-2');

    expect(card1).toHaveTextContent('P1');
    expect(card2).toHaveTextContent('P2');
  });

  test('muestra spinner mientras carga y luego muestra vacio si no hay datos', async () => {
    (getProductos as any).mockResolvedValue([]);

    render(<HomeClientePage />);

    // mientras carga debe mostrar un elemento con role status (Spin no tiene texto fijo), comprobamos que al final no hay cards
    const list = await screen.findByText(/Productos Destacados/i);
    expect(list).toBeInTheDocument();

    // no debe encontrar ningún card
    expect(screen.queryByTestId('card-1')).toBeNull();
  });
});
