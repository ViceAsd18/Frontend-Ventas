import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock react-router useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({ useNavigate: () => mockNavigate }));

// Mock services/orden
vi.mock('services/orden', () => {
  const getOrdenes = vi.fn();
  const actualizarOrden = vi.fn();
  const registrarPagoOrden = vi.fn();
  const getOrdenById = vi.fn();
  return { __esModule: true, getOrdenes, actualizarOrden, registrarPagoOrden, getOrdenById };
});

// Mock antd message
vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  return {
    ...actual,
    message: { success: vi.fn(), error: vi.fn() },
  };
});

// Mock VendedorLayout and Titulo
vi.mock('componentes/layout/VendedorLayout', () => ({ __esModule: true, default: ({ children }: any) => <div>{children}</div> }));
vi.mock('componentes/atomos/Titulo', () => ({ __esModule: true, default: ({ children }: any) => <div>{children}</div> }));

// Mock TablaOrdenes to render ordenes and expose buttons to call callbacks
vi.mock('componentes/organismo/Vendedor/TablaOrdenes', () => ({
  __esModule: true,
  default: ({ ordenes, onNuevaOrden, onVerDetalle, onPagarOrden, onCancelarOrden }: any) => (
    <div>
      <button onClick={() => onNuevaOrden?.()}>Nueva Orden Mock</button>
      {ordenes && ordenes.map((o: any) => (
        <div key={o.id_venta} data-testid={`orden-${o.id_venta}`}>
          <span data-testid={`orden-estado-${o.id_venta}`}>{o.estado}</span>
          <button onClick={() => onVerDetalle?.(o)}>Ver Detalle Mock</button>
          <button onClick={() => onPagarOrden?.(o)}>Pagar Orden Mock</button>
          <button onClick={() => onCancelarOrden?.(o)}>Cancelar Orden Mock</button>
        </div>
      ))}
    </div>
  ),
}));

// Mock ModalPago to render when visible and call onRegistrarPago
vi.mock('componentes/moleculas/Vendedor/ModalPago', () => ({
  __esModule: true,
  default: ({ visible, onRegistrarPago, ordenId, cliente, total }: any) => (
    visible ? (
      <div data-testid="modal-pago">
        <div>ModalPago {ordenId} {cliente} {total}</div>
        <button onClick={() => onRegistrarPago?.(total)}>Registrar Pago Mock</button>
      </div>
    ) : null
  ),
}));

import OrdenesPage from '../OrdenesPage';
import { getOrdenes, actualizarOrden, registrarPagoOrden, getOrdenById } from 'services/orden';
import { message } from 'antd';

describe('OrdenesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renderiza órdenes obtenidas desde el servicio', async () => {
    const mockData = [
      { id_venta: 100, usuario: { nombre: 'User A' }, estado: 'pendiente', total: 1000 },
    ];
    (getOrdenes as any).mockResolvedValue(mockData);

    render(<OrdenesPage />);

    // espera a que la orden aparezca en el DOM
    const ord = await screen.findByTestId('orden-100');
    expect(ord).toBeInTheDocument();
    expect(screen.getByTestId('orden-estado-100')).toHaveTextContent('pendiente');
  });

  test('navega a crear-orden y detalle correctamente', async () => {
    (getOrdenes as any).mockResolvedValue([{ id_venta: 101, usuario: { nombre: 'U' }, estado: 'pendiente', total: 500 }]);

    render(<OrdenesPage />);

    // nueva orden
    const btnNueva = await screen.findByText('Nueva Orden Mock');
    fireEvent.click(btnNueva);
    expect(mockNavigate).toHaveBeenCalledWith('/crear-orden');

    // ver detalle
    const btnVer = await screen.findByText('Ver Detalle Mock');
    fireEvent.click(btnVer);
    expect(mockNavigate).toHaveBeenCalledWith('/orden/101');
  });

  test('pagar orden abre modal y registrar pago actualiza orden y cierra modal', async () => {
    (getOrdenes as any).mockResolvedValue([{ id_venta: 102, usuario: { nombre: 'U2' }, estado: 'pendiente', total: 200 }]);
    (actualizarOrden as any).mockResolvedValue({});

    render(<OrdenesPage />);

    const btnPagar = await screen.findByText('Pagar Orden Mock');
    fireEvent.click(btnPagar);

    // modal visible
    const modal = await screen.findByTestId('modal-pago');
    expect(modal).toBeInTheDocument();

    // click registrar pago
    const btnRegistrar = screen.getByText('Registrar Pago Mock');
    // prepare getOrdenById to return updated order
    const updated = { id_venta: 102, usuario: { nombre: 'U2' }, estado: 'completada', total: 200 };
    (registrarPagoOrden as any).mockResolvedValue({});
    (getOrdenById as any).mockResolvedValue(updated);

    fireEvent.click(btnRegistrar);

    // esperar que registrarPagoOrden y getOrdenById hayan sido invocados y modal desaparezca
    await waitFor(() => {
      expect(registrarPagoOrden).toHaveBeenCalled();
      expect(getOrdenById).toHaveBeenCalledWith(102);
      expect(screen.queryByTestId('modal-pago')).toBeNull();
    });
  });

  test('cancelar orden llama a actualizarOrden y muestra mensaje', async () => {
    (getOrdenes as any).mockResolvedValue([{ id_venta: 103, usuario: { nombre: 'U3' }, estado: 'pendiente', total: 300 }]);
    (actualizarOrden as any).mockResolvedValue({});

    render(<OrdenesPage />);

    const btnCancelar = await screen.findByText('Cancelar Orden Mock');
    fireEvent.click(btnCancelar);

    await waitFor(() => {
      expect(actualizarOrden).toHaveBeenCalledWith(103, { estado: 'cancelada' });
      expect((message as any).success).toHaveBeenCalledWith('Orden #103 cancelada');
    });
  });
});
