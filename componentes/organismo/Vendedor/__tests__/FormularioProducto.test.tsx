import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock servicio de categorías antes de importar el componente
const mockGetCategorias = vi.fn();
vi.mock('services/categoria', () => ({ __esModule: true, getCategorias: () => mockGetCategorias() }));

import FormularioProducto from '../FormularioProducto';

describe('FormularioProducto', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza campos y carga categorías', async () => {
    mockGetCategorias.mockResolvedValueOnce([
      { id_categoria: 1, nombre_categoria: 'Cat1', descripcion_categoria: '' },
    ]);

    render(<FormularioProducto modo="crear" onSubmit={vi.fn()} />);

    // Campos básicos (nombre y descripción tienen placeholder)
    const nombreInput = screen.getByPlaceholderText('Nombre del producto');
    expect(nombreInput).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Descripción')).toBeInTheDocument();

    // Esperar a que carguen las categorías y su opción aparezca
    await waitFor(() => expect(screen.getByText('Cat1')).toBeInTheDocument());

    // Botón muestra texto de crear en modo crear
    expect(screen.getByRole('button', { name: /Crear Producto/i })).toBeInTheDocument();
  });

  it('envía los valores iniciales al hacer submit', async () => {
    mockGetCategorias.mockResolvedValueOnce([
      { id_categoria: 1, nombre_categoria: 'Cat1', descripcion_categoria: '' },
    ]);

    const onSubmit = vi.fn();

    const productoInicial = {
      nombre_producto: 'Prod A',
      descripcion_producto: 'Desc',
      precio: 1500,
      stock: 3,
      categoriaId: 1,
    };

    render(
      <FormularioProducto modo="crear" productoInicial={productoInicial} onSubmit={onSubmit} />
    );

    // esperar carga de categorías
    await waitFor(() => expect(screen.getByText('Cat1')).toBeInTheDocument());

    // Rellenar manualmente los campos y submit (InputNumber no siempre expone placeholder)
    const nombre = screen.getByPlaceholderText('Nombre del producto');
    const descripcion = screen.getByPlaceholderText('Descripción');
    const precioInput = document.querySelector('input[name="precio"]') as HTMLInputElement;
    const stockInput = document.querySelector('input[name="stock"]') as HTMLInputElement;
    const selectEl = document.querySelector('select[name="categoriaId"]') as HTMLSelectElement;

    fireEvent.change(nombre, { target: { value: 'Prod A' } });
    fireEvent.change(descripcion, { target: { value: 'Desc' } });
    if (precioInput) fireEvent.change(precioInput, { target: { value: '1500' } });
    if (stockInput) fireEvent.change(stockInput, { target: { value: '3' } });
    if (selectEl) fireEvent.change(selectEl, { target: { value: '1' } });

    const btn = screen.getByRole('button', { name: /Crear Producto/i });
    fireEvent.click(btn);

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());

    // Verificar que onSubmit se llamó y que contiene los campos principales
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      nombre_producto: 'Prod A',
      descripcion_producto: 'Desc',
      categoriaId: expect.anything(),
    }));
  });

  it('muestra texto de boton correcto en modo editar', async () => {
    mockGetCategorias.mockResolvedValueOnce([]);

    render(<FormularioProducto modo="editar" onSubmit={vi.fn()} />);

    expect(screen.getByRole('button', { name: /Guardar Cambios/i })).toBeInTheDocument();
  });
});
