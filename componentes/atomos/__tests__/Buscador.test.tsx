import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock @ant-design/icons SearchOutlined
vi.mock('@ant-design/icons', () => {
  const React = require('react');
  return {
    SearchOutlined: () => React.createElement('span', { 'data-testid': 'search-icon' }, '🔍'),
  };
});

// Mock antd Input to a plain input element so we can inspect props and styles
vi.mock('antd', () => {
  const React = require('react');
  return {
    Input: ({ placeholder, prefix, value, onChange, style, allowClear, ...rest }: any) =>
      React.createElement('input', {
        'data-testid': 'ant-input',
        placeholder,
        'data-has-prefix': prefix ? 'true' : undefined,
        value,
        onChange,
        style,
        'data-allowclear': allowClear ? 'true' : undefined,
        ...rest,
      }),
  };
});

import Buscador from '../Buscador';

describe('Buscador', () => {
  it('muestra el placeholder por defecto cuando no se pasa uno', () => {
    const handle = vi.fn();
    render(<Buscador value="" onChange={handle} />);
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });

  it('muestra un placeholder personalizado cuando se pasa', () => {
    const handle = vi.fn();
    render(<Buscador placeholder="Buscar productos" value="" onChange={handle} />);
    expect(screen.getByPlaceholderText('Buscar productos')).toBeInTheDocument();
  });

  it('llama a onChange con el valor tipeado', () => {
    const handle = vi.fn();
    render(<Buscador value="" onChange={handle} />);
    const input = screen.getByTestId('ant-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'hola' } });
    expect(handle).toHaveBeenCalledWith('hola');
  });

  it('aplica el width por defecto (250) como maxWidth en estilo', () => {
    const handle = vi.fn();
    render(<Buscador value="" onChange={handle} />);
    const input = screen.getByTestId('ant-input');
    expect(getComputedStyle(input).maxWidth).toBe('250px');
  });

  it('aplica un width en porcentaje cuando se pasa como string', () => {
    const handle = vi.fn();
    render(<Buscador value="" onChange={handle} width="50%" />);
    const input = screen.getByTestId('ant-input');
    expect(getComputedStyle(input).maxWidth).toBe('50%');
  });

  it('pasa allowClear al input (atributo presente)', () => {
    const handle = vi.fn();
    render(<Buscador value="" onChange={handle} />);
    const input = screen.getByTestId('ant-input');
    // our mock renders data-allowclear when allowClear is true
    expect(input).toHaveAttribute('data-allowclear', 'true');
  });
});
