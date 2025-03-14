import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';
import StoreProvider from '../providers/StoreProvider'; // Importando o Provider

describe('Navbar Component', () => {
  test('renders correctly', () => {
    render(
      <StoreProvider>
        <Navbar />
      </StoreProvider>
    );
    
    // Verifica se o título está presente no DOM
    expect(screen.getByText('Container App')).toBeInTheDocument();
    
    // Verifica se o Select está presente no DOM
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
