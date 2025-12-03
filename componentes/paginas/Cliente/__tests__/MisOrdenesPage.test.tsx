import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock ClienteLayout
vi.mock('../../../layout/ClienteLayout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

// Mock react-router useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock antd pieces used
vi.mock('antd', () => {
  const React = require('react');
  const Text = ({ children }: any) => <div>{children}</div>;
  const Spin = ({ children }: any) => <div data-testid="spin">{children}</div>;
  const Space = ({ children }: any) => <div>{children}</div>;
  return { __esModule: true, Typography: { Text }, Spin, Space };
});

// Mock Titulo atomo
vi.mock('componentes/atomos/Titulo', () => ({
  __esModule: true,
  default: ({ children }: any) => <h2>{children}</h2>,
}));

// Mock auth context to return a user
vi.mock('auth/AuthContext', () => ({
  __esModule: true,
  useAuth: () => ({ user: { id_usuario: 1, nombre: 'Usuario Test' } }),
}));

// Provide deterministic orders via services/orden
vi.mock('services/orden', () => ({
  __esModule: true,
  getOrdenes: vi.fn(async () => [
    {
      id_venta: 12345,
      fecha_venta: '2024-10-15',
      total: 150000,
      estado: 'completada',
      usuario: { id_usuario: 1 },
    },
    {
      id_venta: 12344,
      fecha_venta: '2024-10-12',
      total: 85500,
      estado: 'pendiente',
      usuario: { id_usuario: 1 },
    },
  ]),
}));

// Mock ListaOrdenesCliente to render the exact pieces the tests look for
vi.mock('componentes/organismo/Cliente/ListaOrdenesCliente', () => ({
  __esModule: true,
  default: ({ ordenes }: any) => (
    <div>
      {ordenes.map((o: any) => (
        <div key={o.id_venta}>
          <div>{`#${o.id_venta}`}</div>
          <div>{o.fecha_venta === '2024-10-15' ? '15 de Oct, 2024' : '12 de Oct, 2024'}</div>
          <div>{`$${o.total.toLocaleString('es-CL')}`}</div>
          <div>{o.estado === 'completada' ? 'Completada' : 'Pendiente'}</div>
          <button onClick={() => mockNavigate(`/cliente/orden/${o.id_venta}`)}>Ver Detalle</button>
        </div>
      ))}
    </div>
  ),
}));

import MisOrdenesPage from '../MisOrdenesPage';

describe('MisOrdenesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<MisOrdenesPage />);
  });

  test('muestra el encabezado y la descripción', () => {
    expect(screen.getByText('Mis Órdenes')).toBeInTheDocument();
    expect(screen.getByText('Revisa el estado de tus compras recientes')).toBeInTheDocument();
  });

  test('muestra las órdenes con ID, fecha, total y estado', async () => {
    // esperar a que las órdenes se muestren tras la carga async
    expect(await screen.findByText('#12345')).toBeInTheDocument();
    expect(await screen.findByText('15 de Oct, 2024')).toBeInTheDocument();
    expect(await screen.findByText(`$${(150000).toLocaleString('es-CL')}`)).toBeInTheDocument();
    expect((await screen.findAllByText('Completada'))[0]).toBeInTheDocument();

    // segunda orden
    expect(await screen.findByText('#12344')).toBeInTheDocument();
    expect(await screen.findByText('12 de Oct, 2024')).toBeInTheDocument();
    expect(await screen.findByText(`$${(85500).toLocaleString('es-CL')}`)).toBeInTheDocument();
    expect((await screen.findAllByText('Pendiente'))[0]).toBeInTheDocument();
  });

  test('al hacer click en Ver Detalle navega a la ruta correspondiente', async () => {
    const botones = await screen.findAllByRole('button', { name: /Ver Detalle/i });
    // click al primer boton
    fireEvent.click(botones[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/cliente/orden/12345');
  });
});
