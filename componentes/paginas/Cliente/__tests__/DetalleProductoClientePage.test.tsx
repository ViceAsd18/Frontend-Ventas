import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock react-router hooks
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useParams: () => ({ id: '1' }),
  useNavigate: () => mockNavigate,
}));

// Mock ClienteLayout to render children
vi.mock('../../../layout/ClienteLayout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

// Mock antd components used in DetalleProductoClientePage
vi.mock('antd', () => {
  const React = require('react');
  const Spin = ({ children }: any) => <div data-testid="spin">{children}</div>;
  const Button = ({ children, onClick, ...props }: any) => <button onClick={onClick} {...props}>{children}</button>;
  const Result = ({ title, subTitle, extra }: any) => (
    <div>
      <h1>{title}</h1>
      <div>{subTitle}</div>
      <div>{extra}</div>
    </div>
  );
  const message = { error: vi.fn() };

  return {
    __esModule: true,
    Spin,
    Button,
    Result,
    message,
  };
});

// Mock InfoProductoCliente to display producto.nombre_producto
vi.mock('componentes/organismo/Cliente/InfoProductoCliente', () => ({
  __esModule: true,
  default: ({ producto }: any) => <div data-testid="info-producto">{producto?.nombre_producto}</div>,
}));

// Mock getProductoById from services/productos
vi.mock('../../../../services/productos', () => ({
  __esModule: true,
  getProductoById: vi.fn(),
}));

import DetalleProductoClientePage from '../DetalleProductoClientePage';
import { getProductoById } from '../../../../services/productos';

describe('DetalleProductoClientePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('muestra InfoProductoCliente cuando el servicio retorna producto', async () => {
    const producto = { id_producto: 1, nombre_producto: 'Producto Test', precio: 1000 } as any;
    (getProductoById as any).mockResolvedValue(producto);

    render(<DetalleProductoClientePage />);

    const info = await screen.findByTestId('info-producto');
    expect(info).toHaveTextContent('Producto Test');
  });

  test('muestra mensaje de producto no encontrado y boton navega a inicio', async () => {
    (getProductoById as any).mockResolvedValue(null);

    render(<DetalleProductoClientePage />);

    const title = await screen.findByText('Producto no encontrado');
    expect(title).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: /Ir al Inicio/i });
    fireEvent.click(btn);
    expect(mockNavigate).toHaveBeenCalledWith('/cliente/home_cliente');
  });

  test('boton volver al catálogo navega a mis ordenes', async () => {
    (getProductoById as any).mockResolvedValue({ id_producto: 1 } as any);

    render(<DetalleProductoClientePage />);

    const back = await screen.findByText('Volver al catálogo');
    fireEvent.click(back);

    expect(mockNavigate).toHaveBeenCalledWith('/cliente/home_cliente');
  });
});
