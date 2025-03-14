import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoreProvider from './providers/StoreProvider'; // Envolver com Redux Provider
import App from './App';

describe('App Component (Simplified)', () => {
  test('renders App and finds footer text', async () => {
    render(
      <StoreProvider>
        <App />
      </StoreProvider>
    );

    // Esperar até que o footer esteja disponível
    await screen.findByText('Footer');
  });
});
