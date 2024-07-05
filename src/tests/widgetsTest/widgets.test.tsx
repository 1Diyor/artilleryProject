import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LayerExplorer } from '../../widgets/layer-explorer/index';

describe('Render Layers Components', () => {
  it('Renders Component Text', () => {
    render(<LayerExplorer />);
    const button = screen.getByTestId('testButton');
    expect(button).toBeInTheDocument();
  });
});
