import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock antd Card and Typography.Text for deterministic testing
vi.mock('antd', () => {
  const React = require('react');
  return {
    Card: ({ children, style }: any) => React.createElement('div', { 'data-testid': 'ant-card', style }, children),
    Typography: {
      Text: ({ children, strong, type, style }: any) => React.createElement('span', { 'data-testid': 'ant-text', 'data-strong': strong ? 'true' : 'false', 'data-type': type ?? '', style }, children),
    },
  };
});

import TopProductCard from '../TopProductCard';

describe('TopProductCard', () => {
  it('muestra el nombre y la cantidad de vendidos', () => {
    render(<TopProductCard nombre="Producto A" vendidos={42} />);

    // Card container
    expect(screen.getByTestId('ant-card')).toBeInTheDocument();

    // There are two Typography.Text mocks rendered: name (strong) and vendidos (secondary)
    const texts = screen.getAllByTestId('ant-text');
    expect(texts.length).toBeGreaterThanOrEqual(2);

    // First text is the product name and should be strong
    expect(texts[0]).toHaveTextContent('Producto A');
    expect(texts[0].getAttribute('data-strong')).toBe('true');

    // Second text shows the sold count and should include "vendidos" with type secondary
    expect(texts[1]).toHaveTextContent('42 vendidos');
    expect(texts[1].getAttribute('data-type')).toBe('secondary');
  });
});
