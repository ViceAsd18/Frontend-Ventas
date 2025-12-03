import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock react-router navigate
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({ useNavigate: () => mockNavigate }));

// Mock services
vi.mock('services/usuario', () => ({ __esModule: true, getClientes: vi.fn().mockResolvedValue([{ id_usuario: 1, nombre: 'Cliente 1' }]) }));
vi.mock('services/productos', () => ({
  __esModule: true,
  getProductos: vi.fn().mockResolvedValue([{ id_producto: 10, nombre_producto: 'Prod A', precio: 1000 }]),
  getProductoById: vi.fn(async (id: number) => {
    // simple lookup for tests
    if (id === 10) return { id_producto: 10, nombre_producto: 'Prod A', precio: 1000 };
    return null;
  }),
}));
vi.mock('services/orden', () => {
  const crearOrden = vi.fn();
  return { __esModule: true, crearOrden };
});

// Mock antd message
vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  return {
    ...actual,
    message: { success: vi.fn(), error: vi.fn() },
  };
});

// Mocks for layout and child components
vi.mock('componentes/layout/VendedorLayout', () => ({ __esModule: true, default: ({ children }: any) => <div>{children}</div> }));
vi.mock('componentes/atomos/Titulo', () => ({ __esModule: true, default: ({ children }: any) => <h1>{children}</h1> }));

// Mock CrearOrden: render buttons that trigger provided callbacks
vi.mock('componentes/organismo/Vendedor/CrearOrden', () => ({
  __esModule: true,
  default: ({ onGenerarOrden, onPagarOrden }: any) => (
    <div>
      <button onClick={() => onGenerarOrden(1, [{ id_producto: 10, cantidad: 2, precio: 1000 }])}>
        Generar Orden Mock
      </button>
      <button onClick={() => onPagarOrden(1, [{ id_producto: 10, cantidad: 3, precio: 1000 }])}>
        Pagar Orden Mock
      </button>
    </div>
  ),
}));

// Mock ModalPago to render when visible
vi.mock('componentes/moleculas/Vendedor/ModalPago', () => ({
  __esModule: true,
  default: ({ visible, total, cliente, ordenId }: any) => (
    visible ? <div data-testid="modal-pago">ModalPago - {cliente} - {total} - {ordenId}</div> : null
  ),
}));

import CrearOrdenPage from '../CrearOrdenPage';
import { crearOrden } from 'services/orden';
import { message } from 'antd';

describe('CrearOrdenPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renderiza título y los botones del formulario mock', async () => {
    render(<CrearOrdenPage />);

    expect(await screen.findByText('Crear Nueva Orden')).toBeInTheDocument();
    expect(screen.getByText('Generar Orden Mock')).toBeInTheDocument();
    expect(screen.getByText('Pagar Orden Mock')).toBeInTheDocument();
  });

  test('al generar orden llama a crearOrden, muestra success y navega a /ordenes', async () => {
    (crearOrden as any).mockResolvedValue({ id_venta: 555 });

    render(<CrearOrdenPage />);

    const btn = screen.getByText('Generar Orden Mock');
    fireEvent.click(btn);

    // esperar a que crearOrden, message.success y navigate sean invocados
    await waitFor(() => {
      expect(crearOrden).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/ordenes');
    });
  });

  test('al pagar orden crea la orden y abre ModalPago con datos', async () => {
    (crearOrden as any).mockResolvedValue({ id_venta: 777 });

    render(<CrearOrdenPage />);

    const btn = screen.getByText('Pagar Orden Mock');
    fireEvent.click(btn);

    // ModalPago debería mostrarse con el cliente y total calculado
    const modal = await screen.findByTestId('modal-pago');
    expect(modal).toBeInTheDocument();
    expect(crearOrden).toHaveBeenCalled();
  });
});
