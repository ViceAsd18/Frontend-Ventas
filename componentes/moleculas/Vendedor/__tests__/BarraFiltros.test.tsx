import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock Buscador atom
vi.mock('componentes/atomos/Buscador', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ value, onChange, placeholder }: any) => React.createElement('input', { 'data-testid': 'buscador', value, placeholder, onChange: (e: any) => onChange(e.target.value) }),
  };
});

// Mock antd components used by BarraFiltros
vi.mock('antd', () => {
  const React = require('react');
  return {
    __esModule: true,
    Button: ({ children, onClick }: any) => React.createElement('button', { 'data-testid': 'ant-button', onClick }, children),
    Select: ({ value, onChange, options }: any) => React.createElement('select', { 'data-testid': 'ant-select', value: value ?? '', onChange: (e: any) => onChange(e.target.value) },
      (options || []).map((o: any, i: number) => React.createElement('option', { key: i, value: o.value }, o.label))
    ),
    Space: ({ children }: any) => React.createElement('div', {}, children),
  };
});

import BarraFiltros from '../BarraFiltros';

describe('BarraFiltros', () => {
  it('muestra valores iniciales y llama handlers al cambiar buscador y selects', () => {
    const onBusquedaChange = vi.fn();
    const onCategoriaChange = vi.fn();
    const onDisponibilidadChange = vi.fn();

    render(
      <BarraFiltros
        busqueda="abc"
        onBusquedaChange={onBusquedaChange}
        categoria="Ropa"
        onCategoriaChange={onCategoriaChange}
        disponibilidad="En stock"
        onDisponibilidadChange={onDisponibilidadChange}
      />
    );

    // Buscador muestra el valor inicial
    const buscador = screen.getByTestId('buscador') as HTMLInputElement;
    expect(buscador).toBeInTheDocument();
    expect(buscador.value).toBe('abc');

    // Los dos Selects se renderizan
    const selects = screen.getAllByTestId('ant-select');
    expect(selects.length).toBeGreaterThanOrEqual(2);

    // Valores iniciales de selects
    const [categoriaSelect, disponibilidadSelect] = selects;
    expect((categoriaSelect as HTMLSelectElement).value).toBe('Ropa');
    expect((disponibilidadSelect as HTMLSelectElement).value).toBe('En stock');

    // Cambiar buscador
    fireEvent.change(buscador, { target: { value: 'nuevo' } });
    expect(onBusquedaChange).toHaveBeenCalledWith('nuevo');

    // Cambiar categoria
    fireEvent.change(categoriaSelect, { target: { value: 'Hogar' } });
    expect(onCategoriaChange).toHaveBeenCalledWith('Hogar');

    // Cambiar disponibilidad a Todos -> value ''
    fireEvent.change(disponibilidadSelect, { target: { value: '' } });
    expect(onDisponibilidadChange).toHaveBeenCalledWith('');
  });

  it('al hacer click en Limpiar llama a los handlers pasando cadenas vacías', () => {
    const onBusquedaChange = vi.fn();
    const onCategoriaChange = vi.fn();
    const onDisponibilidadChange = vi.fn();

    render(
      <BarraFiltros
        busqueda="x"
        onBusquedaChange={onBusquedaChange}
        categoria="Ropa"
        onCategoriaChange={onCategoriaChange}
        disponibilidad="En stock"
        onDisponibilidadChange={onDisponibilidadChange}
      />
    );

    const boton = screen.getByTestId('ant-button');
    fireEvent.click(boton);

    expect(onBusquedaChange).toHaveBeenCalledWith('');
    expect(onCategoriaChange).toHaveBeenCalledWith('');
    expect(onDisponibilidadChange).toHaveBeenCalledWith('');
  });
});
