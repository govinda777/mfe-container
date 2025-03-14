import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideMenu from './SideMenu';
import StoreProvider from '../providers/StoreProvider';

describe('SideMenu Component', () => {
  test('renders correctly', async () => {
    render(
      <StoreProvider>
        <SideMenu />
      </StoreProvider>
    );

    // Verifica se o menu está presente
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });
});
