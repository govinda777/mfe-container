import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FallbackTestPage from './FallbackTestPage';
import StoreProvider from '../providers/StoreProvider';

describe('FallbackTestPage Component', () => {
  test('renders correctly', () => {
    render(
      <StoreProvider>
        <FallbackTestPage />
      </StoreProvider>
    );

    // Verifica se o Card do Ant Design foi renderizado
    expect(screen.getByTestId('card')).toBeInTheDocument();

    // Verifica se os Alerts do Ant Design foram renderizados
    expect(screen.getAllByTestId('alert')).toHaveLength(2);

    // Verifica se os botões foram renderizados
    expect(screen.getAllByTestId('button')).toHaveLength(5);

    // Verifica se o parágrafo foi renderizado
    expect(screen.getByTestId('paragraph')).toBeInTheDocument();
  });
});
