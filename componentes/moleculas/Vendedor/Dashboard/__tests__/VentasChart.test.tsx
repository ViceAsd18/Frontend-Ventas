import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock antd Card to expose the title prop and children
vi.mock('antd', () => {
  const React = require('react');
  return {
    Card: ({ children, title }: any) => React.createElement('div', { 'data-testid': 'ant-card' }, React.createElement('h2', {}, title), children),
  };
});

// Mock recharts components to capture the `data` prop passed to LineChart
vi.mock('recharts', () => {
  const React = require('react');
  return {
    ResponsiveContainer: ({ children }: any) => React.createElement('div', { 'data-testid': 'responsive-container' }, children),
    LineChart: ({ data, children }: any) => React.createElement('div', { 'data-testid': 'recharts-linechart', 'data-chart': JSON.stringify(data) }, children),
    XAxis: () => React.createElement('div', { 'data-testid': 'x-axis' }),
    YAxis: () => React.createElement('div', { 'data-testid': 'y-axis' }),
    Tooltip: () => React.createElement('div', { 'data-testid': 'tooltip' }),
    Line: () => React.createElement('div', { 'data-testid': 'line' }),
  };
});

import VentasGrafico from '../VentasChart';

describe('VentasGrafico', () => {
  it('suma solo las ordenes completadas y pasa los datos al LineChart', () => {
    const ordenes = [
      { estado: 'completada', fecha_venta: '2025-11-30T10:00:00Z', total: 100 },
      { estado: 'pendiente', fecha_venta: '2025-11-30T12:00:00Z', total: 50 },
      { estado: 'completada', fecha_venta: '2025-12-01T09:00:00Z', total: 25 },
    ];

    render(<VentasGrafico ordenes={ordenes as any} />);

    // Card title should be rendered
    expect(screen.getByTestId('ant-card')).toBeInTheDocument();
    expect(screen.getByText('Ventas de la Semana')).toBeInTheDocument();

    // The mocked LineChart receives a `data` prop serialized in data-chart
    const chart = screen.getByTestId('recharts-linechart');
    const chartData = JSON.parse(chart.getAttribute('data-chart') || '[]');

    // The total of completed orders is 125; at least one entry should have total 125 when both completed orders fall on same label, otherwise there should be entries summing to those values.
    const totals = chartData.map((d: any) => d.total);
    // Ensure completed totals are present and pending total is not included alone
    expect(totals).toEqual(expect.arrayContaining([100, 25]));
    expect(totals).not.toEqual(expect.arrayContaining([50]));
  });
});
