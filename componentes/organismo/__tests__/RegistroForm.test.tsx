import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock Titulo to render children plainly
vi.mock('componentes/atomos/Titulo', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
}));

// Mock useNavigate from react-router (use a file-unique name to avoid symbol collisions)
const mockNavigateRegistro = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigateRegistro,
}));

import RegistroForm from '../RegistroForm';

describe('RegistroForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renderiza campos y botón', () => {
    render(<RegistroForm onSubmit={vi.fn()} />);

    expect(screen.getByText('Crea tu cuenta')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tu nombre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ejemplo@correo.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('********')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });

  test('al enviar datos válidos llama a onSubmit con nombre, email y password', async () => {
    const handle = vi.fn();
    render(<RegistroForm onSubmit={handle} />);

    const nombre = screen.getByPlaceholderText('Tu nombre');
    const email = screen.getByPlaceholderText('ejemplo@correo.com');
    const pass = screen.getByPlaceholderText('********');

    fireEvent.change(nombre, { target: { value: 'Usuario' } });
    fireEvent.change(email, { target: { value: 'u@correo.com' } });
    fireEvent.change(pass, { target: { value: 'Secreto123' } });

    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    await waitFor(() => {
      expect(handle).toHaveBeenCalledWith('Usuario', 'u@correo.com', 'Secreto123');
    });
  });

  test('clic en enlace de login llama a navigate con /login', () => {
    render(<RegistroForm onSubmit={vi.fn()} />);

    const link = screen.getByText('Inicia sesión');
    fireEvent.click(link);

    expect(mockNavigateRegistro).toHaveBeenCalledWith('/login');
  });
});

