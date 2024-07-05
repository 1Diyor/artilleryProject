import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LayerExplorer } from '../../widgets/layer-explorer/index';

describe('Render Layers Components', () => {
  it('Renders Component Text', () => {
    render(<LayerExplorer />);
    const cardTitle = screen.getByText(/Layer Explorer/i);
    const card = cardTitle.closest('.ant-card') as HTMLElement;
    expect(card).toBeInTheDocument();
    const { getByRole } = within(card);
    const button = getByRole('button', { name: /plus/i });
    expect(button).toBeInTheDocument();
  });
});
