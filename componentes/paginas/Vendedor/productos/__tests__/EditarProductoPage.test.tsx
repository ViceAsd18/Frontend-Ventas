import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock layout
vi.mock('componentes/layout/VendedorLayout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="vendedor-layout">{children}</div>,
}));

// Mock router hooks
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useParams: () => ({ id: '123' }),
  useNavigate: () => mockNavigate,
}));

// Mock Titulo
vi.mock('componentes/atomos/Titulo', () => ({
  __esModule: true,
  default: ({ children }: any) => <h1 data-testid="titulo">{children}</h1>,
}));

// Mock FormularioProducto: expose productoInicial and a button to trigger onSubmit
vi.mock('componentes/organismo/Vendedor/FormularioProducto', () => ({
  __esModule: true,
  default: (props: any) => (
    <div>
      <div data-testid="editar-form">
        <span data-testid="producto-nombre">{props.productoInicial?.nombre_producto}</span>
        <button onClick={() => props.onSubmit({
          nombre_producto: 'Nombre Editado',
          descripcion_producto: 'Desc',
          precio: 999,
          stock: 5,
          categoria: 2,
        })}>
          Ejecutar submit
        </button>
      </div>
    </div>
  ),
}));

// Mock services/productos
const mockGetProductoById = vi.fn();
const mockEditarProducto = vi.fn();
vi.mock('services/productos', () => ({
  __esModule: true,
  getProductoById: (...args: any[]) => mockGetProductoById(...args),
  editarProducto: (...args: any[]) => mockEditarProducto(...args),
}));

// Mock antd message
const mockSuccess = vi.fn();
const mockError = vi.fn();
vi.mock('antd', async () => {
  const actual = await vi.importActual<any>('antd');
  return {
    ...actual,
    message: {
      success: (...args: any[]) => mockSuccess(...args),
      error: (...args: any[]) => mockError(...args),
    },
  };
});

import EditarProductoPage from '../EditarProductoPage';

describe('EditarProductoPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renderiza título y espera al formulario tras cargar producto', async () => {
    mockGetProductoById.mockResolvedValueOnce({
      id: 123,
      nombre_producto: 'Producto A',
      descripcion_producto: 'Desc A',
      precio: 10,
      stock: 1,
      categoria: { id_categoria: 7 },
    });

    render(<EditarProductoPage />);

    expect(screen.getByTestId('vendedor-layout')).toBeInTheDocument();
    expect(screen.getByTestId('titulo')).toHaveTextContent('Editar Producto');

    // form appears after getProductoById resolves
    const nombre = await screen.findByTestId('producto-nombre');
    expect(nombre).toHaveTextContent('Producto A');
  });

  test('al enviar formulario exitoso llama editarProducto, muestra success y navega', async () => {
    mockGetProductoById.mockResolvedValueOnce({
      id: 123,
      nombre_producto: 'Producto A',
      descripcion_producto: 'Desc A',
      precio: 10,
      stock: 1,
      categoria: { id_categoria: 7 },
    });

    mockEditarProducto.mockResolvedValueOnce({});

    render(<EditarProductoPage />);

    // wait for form
    await screen.findByTestId('editar-form');

    // trigger submit (the mock FormularioProducto will call props.onSubmit with sample values)
    fireEvent.click(screen.getByText('Ejecutar submit'));

    // esperar a que editarProducto haya sido llamada con id y payload
    await waitFor(() => expect(mockEditarProducto).toHaveBeenCalledWith(123, {
      nombre_producto: 'Nombre Editado',
      descripcion_producto: 'Desc',
      precio: 999,
      stock: 5,
      categoriaId: 2,
    }));

    await waitFor(() => expect(mockSuccess).toHaveBeenCalledWith('Producto actualizado correctamente'));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/productos'));
  });

  test('al fallar edición muestra mensaje de error', async () => {
    mockGetProductoById.mockResolvedValueOnce({
      id: 123,
      nombre_producto: 'Producto A',
      descripcion_producto: 'Desc A',
      precio: 10,
      stock: 1,
      categoria: { id_categoria: 7 },
    });

    mockEditarProducto.mockRejectedValueOnce(new Error('network'));

    render(<EditarProductoPage />);

    await screen.findByTestId('editar-form');
    fireEvent.click(screen.getByText('Ejecutar submit'));

    await waitFor(() => expect(mockError).toHaveBeenCalledWith('Error al editar el producto'));
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
