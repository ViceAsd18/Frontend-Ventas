import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest';

// We'll compute dates relative to the test runtime to keep the logic deterministic

// Mock getOrdenes service
const mockGetOrdenes = vi.fn();
vi.mock('services/orden', () => ({ __esModule: true, getOrdenes: () => mockGetOrdenes() }));

// Mock StatCard to render a visible element with title and value
vi.mock('componentes/moleculas/Vendedor/Dashboard/StatCard', () => ({
  __esModule: true,
  default: ({ title, value }: any) => <div data-testid={`stat-${title}`}>{title}:{value}</div>,
}));

// Mock VentasChart to expose received prop ordenes
vi.mock('componentes/moleculas/Vendedor/Dashboard/VentasChart', () => ({
  __esModule: true,
  default: ({ ordenes }: any) => <div data-testid="ventas-chart">{JSON.stringify(ordenes)}</div>,
}));

// Mock antd Table/Card/Row/Col to render simple DOM so we can assert rows
vi.mock('antd', () => {
  const React = require('react');
  const Table = ({ dataSource }: any) => (
    <div data-testid="table">
      {dataSource && dataSource.map((r: any) => (
        <div key={r.id_venta} data-testid={`row-${r.id_venta}`}>
          <span>{r.usuario?.nombre}</span>
          <span>{r.total}</span>
        </div>
      ))}
    </div>
  );
  const Card = ({ children, title }: any) => <div data-testid="card"><h4>{title}</h4>{children}</div>;
  const Row = ({ children }: any) => <div>{children}</div>;
  const Col = ({ children }: any) => <div>{children}</div>;
  const Typography = { Text: (props: any) => React.createElement('span', props, props.children) };
  return { __esModule: true, Table, Card, Row, Col, Typography };
});

import DashboardPanel from '../DashboardPanel';

describe('DashboardPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // no-op

  test('calcula y muestra estadísticas, pasa ordenes al gráfico y lista últimas órdenes', async () => {
    // Prepare orders: one completed in current month, one pending, one completed previous month
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const orders = [
      { id_venta: 1, usuario: { id_usuario: 10, nombre: 'Alice' }, fecha_venta: new Date(currentYear, currentMonth, 2).toISOString(), total: 100, estado: 'completada' },
      { id_venta: 2, usuario: { id_usuario: 11, nombre: 'Bob' }, fecha_venta: new Date(currentYear, currentMonth, 3).toISOString(), total: 50, estado: 'pendiente' },
      { id_venta: 3, usuario: { id_usuario: 12, nombre: 'Carol' }, fecha_venta: new Date(currentYear, currentMonth - 1, 15).toISOString(), total: 200, estado: 'completada' },
      { id_venta: 4, usuario: { id_usuario: 10, nombre: 'Alice' }, fecha_venta: new Date(currentYear, currentMonth, 5).toISOString(), total: 25, estado: 'completada' },
    ];

    mockGetOrdenes.mockResolvedValueOnce(orders);

    render(<DashboardPanel />);

    // StatCards: Ventas Mes should sum only completed orders in Dec 2025 => 100 + 25 = 125
    await waitFor(() => expect(screen.getByTestId('stat-Ventas Mes')).toBeInTheDocument());
    expect(screen.getByTestId('stat-Ventas Mes')).toHaveTextContent('Ventas Mes:$125.00');

    // Pendientes = 1
    expect(screen.getByTestId('stat-Pendientes')).toHaveTextContent('Pendientes:1');

    // Completadas = 3 (two in Dec + one in Nov)
    expect(screen.getByTestId('stat-Completadas')).toHaveTextContent('Completadas:3');

    // Canceladas = 0
    expect(screen.getByTestId('stat-Canceladas')).toHaveTextContent('Canceladas:0');

    // Clientes Activos = unique users with orders in Dec => Alice and Bob => 2
    expect(screen.getByTestId('stat-Clientes Activos')).toHaveTextContent('Clientes Activos:2');

    // VentasChart should receive the fetched orders
    expect(screen.getByTestId('ventas-chart')).toHaveTextContent(JSON.stringify(orders));

    // Table should render latest orders (slice last 5 reversed) - ensure rows exist for id 1..4
    expect(screen.getByTestId('row-1')).toBeInTheDocument();
    expect(screen.getByTestId('row-2')).toBeInTheDocument();
    expect(screen.getByTestId('row-3')).toBeInTheDocument();
    expect(screen.getByTestId('row-4')).toBeInTheDocument();
  });
});
