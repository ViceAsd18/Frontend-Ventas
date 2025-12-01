import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock antd components used by ControlsTabla
vi.mock('antd', () => {
  const React = require('react');
  return {
    __esModule: true,
    Input: ({ placeholder, value, onChange }: any) => React.createElement('input', { 'data-testid': 'input-busqueda', placeholder, value, onChange: (e: any) => onChange(e) }),
    Button: ({ children, onClick }: any) => React.createElement('button', { 'data-testid': 'btn-accion', onClick }, children),
    Row: ({ children }: any) => React.createElement('div', {}, children),
    Col: ({ children }: any) => React.createElement('div', {}, children),
    // Provide Select with Option property used in JSX
    Select: Object.assign((props: any) => React.createElement('select', { 'data-testid': 'select-filtro', value: props.value ?? '', onChange: (e: any) => props.onChange(e.target.value) }, props.children), {
      Option: ({ children, value }: any) => React.createElement('option', { value }, children),
    }),
  };
});

import ControlsTabla from '../ControlsTabla';

describe('ControlsTabla', () => {
  it('renderiza input y llama onBusquedaChange cuando cambia', () => {
    const onBusquedaChange = vi.fn();
    render(<ControlsTabla busqueda="" onBusquedaChange={onBusquedaChange} />);

    const input = screen.getByTestId('input-busqueda') as HTMLInputElement;
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'hola' } });
    // ControlsTabla passes a handler that extracts e.target.value, so onBusquedaChange should receive 'hola'
    expect(onBusquedaChange).toHaveBeenCalledWith('hola');
  });

  it('renderiza Select cuando hay opcionesFiltro y llama onFiltroChange', () => {
    const onBusquedaChange = vi.fn();
    const onFiltroChange = vi.fn();
    const opciones = ['A', 'B'];

    render(<ControlsTabla busqueda="" onBusquedaChange={onBusquedaChange} opcionesFiltro={opciones} filtro="A" onFiltroChange={onFiltroChange} />);

    const select = screen.getByTestId('select-filtro') as HTMLSelectElement;
    expect(select).toBeInTheDocument();

    // Cambiar a B
    fireEvent.change(select, { target: { value: 'B' } });
    expect(onFiltroChange).toHaveBeenCalledWith('B');
  });

  it('renderiza botón cuando onBotonClick existe y llama al click', () => {
    const onBusquedaChange = vi.fn();
    const onBotonClick = vi.fn();

    render(<ControlsTabla busqueda="" onBusquedaChange={onBusquedaChange} onBotonClick={onBotonClick} textoBoton="Nuevo" />);

    const boton = screen.getByTestId('btn-accion');
    expect(boton).toBeInTheDocument();
    expect(boton).toHaveTextContent('Nuevo');

    fireEvent.click(boton);
    expect(onBotonClick).toHaveBeenCalled();
  });
});
