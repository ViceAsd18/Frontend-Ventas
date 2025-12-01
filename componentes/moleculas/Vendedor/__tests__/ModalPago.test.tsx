import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock antd to control Form.validateFields and message
vi.mock('antd', () => {
  const React = require('react');

  let validateImpl = () => Promise.resolve({ monto: 0 });

  const Modal = ({ children, title, onOk, onCancel }: any) => React.createElement('div', {},
    React.createElement('div', { 'data-testid': 'modal-title' }, title),
    children,
    React.createElement('button', { 'data-testid': 'modal-ok', onClick: onOk }, 'Registrar Pago'),
    React.createElement('button', { 'data-testid': 'modal-cancel', onClick: onCancel }, 'Cerrar')
  );

  const Input = (props: any) => React.createElement('input', { 'data-testid': 'input-monto', defaultValue: props.defaultValue, type: 'number' });

  function FormMock(props: any) {
    return React.createElement(React.Fragment, {}, props.children);
  }
  FormMock.useForm = () => [{ validateFields: () => validateImpl() }];
  FormMock.Item = ({ children }: any) => React.createElement(React.Fragment, {}, children);
  FormMock.__setValidateImpl = (fn: any) => { validateImpl = fn; };

  const Space = ({ children }: any) => React.createElement('div', {}, children);
  const Typography = {
    Text: ({ children }: any) => React.createElement('span', {}, children),
    Title: ({ children, level }: any) => React.createElement('h' + (level || 3), {}, children),
  };

  const Divider = () => React.createElement('hr');

  const message = {
    error: (..._args: any[]) => {},
    success: (..._args: any[]) => {},
  };

  return {
    __esModule: true,
    Modal,
    Input,
    Form: FormMock,
    Space,
    Typography,
    Divider,
    message,
  };
});

// Mock react-router's useNavigate so we can observe navigation
vi.mock('react-router', () => {
  let nav = () => {};
  return {
    useNavigate: () => nav,
    __setNavigate: (fn: any) => { nav = fn; }
  };
});

import ModalPago from '../ModalPago';

import * as antd from 'antd';
import * as rr from 'react-router';

describe('ModalPago', () => {
  beforeEach(() => {
    // reset spies
    (antd as any).message.error = vi.fn();
    (antd as any).message.success = vi.fn();
    // reset navigate
    (rr as any).__setNavigate(vi.fn());
  });

  it('muestra info cliente/total y muestra error si monto distinto', async () => {
    const onRegistrarPago = vi.fn();
    const onClose = vi.fn();

    // make validateFields resolve with incorrect monto
    (antd as any).Form.__setValidateImpl(() => Promise.resolve({ monto: 50 }));

    render(<ModalPago visible={true} onClose={onClose} ordenId={1} cliente={'Juan'} total={100} onRegistrarPago={onRegistrarPago} />);

    expect(screen.getByTestId('modal-title')).toHaveTextContent('Registrar Pago - Orden #1');
    expect(screen.getByText(/Cliente:/)).toBeInTheDocument();
    expect(screen.getByText(/Total:/)).toBeInTheDocument();

    // Click Registrar Pago
    fireEvent.click(screen.getByTestId('modal-ok'));

    // wait for validateFields promise to resolve and handler to run
    await waitFor(() => {
      expect((antd as any).message.error).toHaveBeenCalled();
      expect(onRegistrarPago).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
      expect((rr as any).useNavigate()).not.toHaveBeenCalled();
    });
  });

  it('registra pago cuando monto coincide y navega', async () => {
    const onRegistrarPago = vi.fn();
    const onClose = vi.fn();
    const mockNavigate = vi.fn();
    (rr as any).__setNavigate(mockNavigate);

    // make validateFields resolve with correct monto
    (antd as any).Form.__setValidateImpl(() => Promise.resolve({ monto: 200 }));

    render(<ModalPago visible={true} onClose={onClose} ordenId={2} cliente={'Ana'} total={200} onRegistrarPago={onRegistrarPago} />);

    fireEvent.click(screen.getByTestId('modal-ok'));

    await waitFor(() => {
      expect(onRegistrarPago).toHaveBeenCalledWith(200);
      expect(onClose).toHaveBeenCalled();
      expect((antd as any).message.success).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/ordenes');
    });
  });
});
