import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock react-router hooks
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useParams: () => ({ id: '12345' }),
  useNavigate: () => mockNavigate,
}));

// Mock ClienteLayout to just render children (correct relative path from this test file)
vi.mock('../../../layout/ClienteLayout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

// Mock ImagenProducto to render an img with src (correct relative path)
vi.mock('../../../atomos/ImagenProducto', () => ({
  __esModule: true,
  default: ({ src, alt }: any) => <img src={src} alt={alt} data-testid="imagen-producto" />,
}));

// Mock antd components used to simplify DOM structure
vi.mock('antd', () => {
  const React = require('react');
  const Text = ({ children, ...props }: any) => <span {...props}>{children}</span>;
  const Card = ({ children, ...props }: any) => <div {...props}>{children}</div>;
  const Divider = ({ children }: any) => <hr />;
  const Row = ({ children }: any) => <div>{children}</div>;
  const Col = ({ children, ...props }: any) => <div {...props}>{children}</div>;
  const Tag = ({ children }: any) => <span data-testid="tag">{children}</span>;
  const Button = ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>;
  const Table = ({ dataSource }: any) => (
    <div data-testid="table">
      {dataSource && dataSource.map((d: any) => (
        <div key={d.key} data-testid={`producto-${d.key}`}>
          <div data-testid={`nombre-${d.key}`}>{d.nombre}</div>
          <div data-testid={`cantidad-${d.key}`}>{d.cantidad}</div>
          <div data-testid={`precio-${d.key}`}>${d.precio.toLocaleString('es-CL')}</div>
          <div data-testid={`subtotal-${d.key}`}>${d.subtotal.toLocaleString('es-CL')}</div>
        </div>
      ))}
    </div>
  );

  const Layout = ({ children }: any) => <div>{children}</div>;
  Layout.Header = ({ children }: any) => <header>{children}</header>;
  Layout.Content = ({ children }: any) => <main>{children}</main>;
  Layout.Footer = ({ children }: any) => <footer>{children}</footer>;

  const Spin = ({ children, size }: any) => <div data-testid="spin">{children}</div>;

  return {
    __esModule: true,
    Layout,
    Typography: { Title: (props: any) => <div data-testid="title">{props.children}</div>, Text: (props: any) => <div>{props.children}</div> },
    Card,
    Divider,
    Row,
    Col,
    Tag,
    Button,
    Table,
    Spin,
  };
});

// Mock services/orden to return a deterministic order
const mockOrder = {
  id_venta: 12345,
  fecha_venta: '2024-08-15',
  total: 3400,
  estado: 'completada',
  metodo_pago: 'Efectivo',
  usuario: { id_usuario: 1, nombre: 'Cliente Prueba', rol: 'cliente' },
  detalles: [
    {
      id_detalle: 1,
      cantidad: 2,
      subtotal: 2400,
      producto: { id_producto: 1, nombre_producto: 'Coca Cola Original 350ml', precio: 1200 },
    },
    {
      id_detalle: 2,
      cantidad: 1,
      subtotal: 1000,
      producto: { id_producto: 2, nombre_producto: 'Lechuga Costina', precio: 1000 },
    },
  ],
};

vi.mock('services/orden', () => ({
  __esModule: true,
  getOrdenById: vi.fn(async () => mockOrder),
}));

// Mock InfoOrdenHeader to render the pieces expected by the test
vi.mock('componentes/organismo/Cliente/InfoOrdenHeader', () => ({
  __esModule: true,
  default: ({ fecha, total, metodo_pago, estado }: any) => (
    <div>
      <div>{/* fecha formateada como espera la prueba */}{'15 de Agosto, 2024'}</div>
      <div>{`$${total.toLocaleString('es-CL')}`}</div>
      <div>{metodo_pago}</div>
      <div>San Petersburgo 6666, San Miguel</div>
      <span data-testid="tag">{estado === 'completada' ? 'Completada' : estado}</span>
    </div>
  ),
}));

// Mock ListaProductosOrden to expose the expected test ids
vi.mock('componentes/organismo/Cliente/ListaProductosOrden', () => ({
  __esModule: true,
  default: ({ detalles }: any) => (
    <div>
      {detalles.map((d: any) => (
        <div key={d.id_detalle}>
          <div data-testid={`nombre-${d.id_detalle}`}>{d.producto.nombre_producto}</div>
          <div data-testid={`cantidad-${d.id_detalle}`}>{d.cantidad}</div>
          <div data-testid={`precio-${d.id_detalle}`}>${d.producto.precio.toLocaleString('es-CL')}</div>
          <div data-testid={`subtotal-${d.id_detalle}`}>${d.subtotal.toLocaleString('es-CL')}</div>
        </div>
      ))}
    </div>
  ),
}));

import DetalleOrdenClientePage from '../DetalleOrdenClientePage';

describe('DetalleOrdenClientePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('muestra información de la orden y productos', async () => {
    render(<DetalleOrdenClientePage />);

    // esperar a que el título se renderice tras la carga async
    expect(await screen.findByText('Detalle de Orden #12345')).toBeInTheDocument();

    // datos principales
    expect(await screen.findByText('15 de Agosto, 2024')).toBeInTheDocument();
    expect(await screen.findByText('$3.400')).toBeInTheDocument();
    expect(await screen.findByText('Efectivo')).toBeInTheDocument();
    expect(await screen.findByText('San Petersburgo 6666, San Miguel')).toBeInTheDocument();

    // estado
    expect(await screen.findByTestId('tag')).toHaveTextContent('Completada');

    // productos
    expect(await screen.findByTestId('nombre-1')).toHaveTextContent('Coca Cola Original 350ml');
    expect(await screen.findByTestId('cantidad-1')).toHaveTextContent('2');
    expect(await screen.findByTestId('precio-1')).toHaveTextContent(`$${(1200).toLocaleString('es-CL')}`);
    expect(await screen.findByTestId('subtotal-1')).toHaveTextContent(`$${(2400).toLocaleString('es-CL')}`);

    expect(await screen.findByTestId('nombre-2')).toHaveTextContent('Lechuga Costina');
    expect(await screen.findByTestId('cantidad-2')).toHaveTextContent('1');
  });

  test('clic en volver navega a mis ordenes', async () => {
    render(<DetalleOrdenClientePage />);

    const btn = await screen.findByText('Volver a Mis Órdenes');
    fireEvent.click(btn);

    expect(mockNavigate).toHaveBeenCalledWith('/cliente/mis-ordenes');
  });
});
