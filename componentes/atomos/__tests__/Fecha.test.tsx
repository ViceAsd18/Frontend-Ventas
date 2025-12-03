import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Fecha from '../Fecha';

describe('Fecha', () => {
  it('muestra "-" cuando no se proporciona fecha', () => {
    // @ts-ignore allow passing undefined for test
    render(<Fecha fecha={undefined} />);
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('formatea fecha en variante corto desde string SQL', () => {
    render(<Fecha fecha="2025-11-28 09:15:00" />);
    expect(screen.getByText('28/11/2025')).toBeInTheDocument();
  });

  it('formatea fecha en variante largo desde string SQL (mes en español)', () => {
    render(<Fecha fecha="2025-11-28 09:15:00" variante="largo" />);
    expect(screen.getByText('28 de noviembre 2025')).toBeInTheDocument();
  });

  it('acepta un objeto Date y lo formatea', () => {
    const d = new Date(2021, 0, 5); // 5 de enero de 2021
    render(<Fecha fecha={d} />);
    expect(screen.getByText('05/01/2021')).toBeInTheDocument();
  });

  it('muestra mensaje de fecha inválida para entradas no parseables', () => {
    render(<Fecha fecha={'not-a-date'} /> as any);
    expect(screen.getByText('Fecha inválida')).toBeInTheDocument();
  });
});
