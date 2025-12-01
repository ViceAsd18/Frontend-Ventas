import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock InputNumber from antd
vi.mock('antd', () => {
  const React = require('react');
  return {
    InputNumber: ({ value, onChange, min }: any) => React.createElement('input', { 'data-testid': 'input-number', type: 'number', defaultValue: value, min, onChange: (e: any) => onChange(Number(e.target.value)) }),
  };
});

// Mock Boton and ImagenProducto components (export as default)
vi.mock('componentes/atomos/Boton', () => {
  const React = require('react');
  function BotonMock(props: any) {
    const { children, onClick, color } = props;
    return React.createElement('button', { 'data-testid': 'boton', onClick, style: { backgroundColor: color } }, children);
  }

  return {
    __esModule: true,
    default: BotonMock,
  };
});

vi.mock('componentes/atomos/ImagenProducto', () => {
  const React = require('react');
  function ImagenMock(props: any) {
    const { src, alt, width, height, style } = props;
    return React.createElement('img', { 'data-testid': 'imagen-producto', src, alt, width, height, style });
  }

  return {
    __esModule: true,
    default: ImagenMock,
  };
});

import OrdenItem from '../OrdenItem';

describe('OrdenItem', () => {
  const producto = {
    id_producto: 7,
    nombre_producto: 'Producto Prueba',
    precio: 9.5,
    cantidad: 3,
  } as any;

  it('renderiza imagen, nombre, cantidad y precio calculado', () => {
    render(<OrdenItem producto={producto} onCantidadChange={() => {}} onEliminar={() => {}} />);

    // Imagen debe usar el nombre normalizado en src
    const img = screen.getByTestId('imagen-producto') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/assets/img/productos/producto_prueba.jpg');

    // Nombre mostrado
    expect(screen.getByText('Producto Prueba')).toBeInTheDocument();

    // Precio calculado: precio * cantidad = 9.5 * 3 = 28.50
    expect(screen.getByText('$28.50')).toBeInTheDocument();
  });

  it('llama onCantidadChange al cambiar la cantidad y onEliminar al hacer click', () => {
    const onCantidadChange = vi.fn();
    const onEliminar = vi.fn();

    render(<OrdenItem producto={producto} onCantidadChange={onCantidadChange} onEliminar={onEliminar} />);

    const input = screen.getByTestId('input-number') as HTMLInputElement;
    // Simular cambio de cantidad a 5
    fireEvent.change(input, { target: { value: '5' } });
    expect(onCantidadChange).toHaveBeenCalledWith(7, 5);

    const boton = screen.getByTestId('boton');
    fireEvent.click(boton);
    expect(onEliminar).toHaveBeenCalledWith(7);
  });
});
