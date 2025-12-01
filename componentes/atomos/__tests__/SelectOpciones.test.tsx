import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock antd Select to a native select so we can inspect options and events
vi.mock('antd', () => {
  const React = require('react');
  return {
    Select: ({ value, onChange, placeholder, style, options }: any) =>
      React.createElement(
        'select',
        {
          'data-testid': 'ant-select',
          value: value == null ? '' : String(value),
          onChange: (e: any) => onChange && onChange(Number(e.target.value)),
          'data-placeholder': placeholder,
          style,
        },
        // render provided options
        ...(options || []).map((opt: any) =>
          React.createElement('option', { key: opt.value, value: String(opt.value) }, opt.label)
        )
      ),
  };
});

import SelectOpciones from '../SelectOpciones';

describe('SelectOpciones', () => {
  const opciones = [
    { label: 'Primero', value: 1 },
    { label: 'Segundo', value: 2 },
    { label: 'Tercero', value: 3 },
  ];

  it('renderiza las opciones recibidas', () => {
    render(<SelectOpciones opciones={opciones} onChange={() => {}} />);
    const select = screen.getByTestId('ant-select');
    // debe tener 3 opciones
    const opts = select.querySelectorAll('option');
    expect(opts.length).toBe(3);
    expect(opts[0]).toHaveTextContent('Primero');
    expect(opts[1]).toHaveTextContent('Segundo');
    expect(opts[2]).toHaveTextContent('Tercero');
  });

  it('pasa placeholder y estilo al componente', () => {
    render(
      <SelectOpciones
        opciones={opciones}
        onChange={() => {}}
        placeholder="Seleccionar"
      />
    );
    const select = screen.getByTestId('ant-select');
    expect(select).toHaveAttribute('data-placeholder', 'Seleccionar');
    expect(select).toHaveStyle({ width: '100%' });
  });

  it('llama a onChange con el valor numérico cuando se selecciona una opción', () => {
    const handle = vi.fn();
    render(<SelectOpciones opciones={opciones} onChange={handle} />);
    const select = screen.getByTestId('ant-select');
    // seleccionar la segunda opción
    fireEvent.change(select, { target: { value: '2' } });
    expect(handle).toHaveBeenCalledWith(2);
  });

  it('muestra el valor seleccionado cuando se pasa `valor`', () => {
    render(<SelectOpciones opciones={opciones} onChange={() => {}} valor={3} />);
    const select = screen.getByTestId('ant-select') as HTMLSelectElement;
    expect(select.value).toBe('3');
  });
});
