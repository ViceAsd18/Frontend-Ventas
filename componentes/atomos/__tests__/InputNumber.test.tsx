import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock antd InputNumber to a plain input that calls the provided onChange with number|null
vi.mock('antd', () => {
  const React = require('react');
  return {
    InputNumber: ({ value, onChange, min, max, ...rest }: any) =>
      React.createElement('input', {
        'data-testid': 'ant-inputnumber',
        value: value != null ? String(value) : '',
        onChange: (e: any) => {
          const v = e.target.value === '' ? null : Number(e.target.value);
          onChange && onChange(v);
        },
        'data-min': min,
        'data-max': max,
        ...rest,
      }),
  };
});

import InputNumero from '../InputNumber';

describe('InputNumero', () => {
  it('muestra el valor inicial y el min por defecto', () => {
    render(<InputNumero valor={3} onChange={() => {}} />);
    const input = screen.getByTestId('ant-inputnumber') as HTMLInputElement;
    expect(input).toHaveValue('3');
    expect(input).toHaveAttribute('data-min', '1');
  });

  it('llama a onChange con el número tipeado', () => {
    const handle = vi.fn();
    render(<InputNumero valor={1} onChange={handle} />);
    const input = screen.getByTestId('ant-inputnumber');
    fireEvent.change(input, { target: { value: '7' } });
    expect(handle).toHaveBeenCalledWith(7);
  });

  it('convierte null/empty a 0 antes de llamar al handler externo', () => {
    const handle = vi.fn();
    render(<InputNumero valor={1} onChange={handle} />);
    const input = screen.getByTestId('ant-inputnumber');
    // simulate clearing the input -> mock passes null to component, component maps to 0
    fireEvent.change(input, { target: { value: '' } });
    expect(handle).toHaveBeenCalledWith(0);
  });

  it('pasa el prop max al componente antd', () => {
    render(<InputNumero valor={2} onChange={() => {}} max={10} />);
    const input = screen.getByTestId('ant-inputnumber');
    expect(input).toHaveAttribute('data-max', '10');
  });
});
