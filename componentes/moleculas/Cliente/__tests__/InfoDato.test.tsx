import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import InfoDato from '../InfoDato';

describe('InfoDato', () => {
  it('muestra label y valor de texto', () => {
    render(<InfoDato label="Nombre" value="Juan" />);
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    const valueEl = screen.getByText('Juan');
    expect(valueEl).toBeInTheDocument();
    const styles = getComputedStyle(valueEl);
    expect(styles.fontSize).toBe('16px');
    expect(styles.fontWeight).toBe('500');
  });

  it('renderiza ReactNode como value', () => {
    render(
      <InfoDato
        label="Detalle"
        value={<span data-testid="child">Detalle personalizado</span>}
      />
    );
    expect(screen.getByText('Detalle personalizado')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('muestra valor numérico 0 correctamente', () => {
    render(<InfoDato label="Cantidad" value={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
