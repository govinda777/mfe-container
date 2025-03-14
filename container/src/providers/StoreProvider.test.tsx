/// <reference types="jest" />
import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoreProvider from './StoreProvider';

// Mock the react-redux module
jest.mock('react-redux', () => ({
  Provider: ({ children }: { children: ReactNode }) => <div data-testid="mock-provider">{children}</div>
}));

// Mock the store
jest.mock('../store', () => ({
  store: {
    getState: jest.fn(),
    dispatch: jest.fn(),
    subscribe: jest.fn()
  }
}));

describe('StoreProvider Component', () => {
  test('renders correctly', () => {
    render(
      <StoreProvider>
        <div data-testid="test-child">Test Child</div>
      </StoreProvider>
    );
    
    // Check if the child component is rendered
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
  
  test('wraps children in a provider', () => {
    render(
      <StoreProvider>
        <div data-testid="test-child">Test Child</div>
      </StoreProvider>
    );
    
    // Check if the provider is rendered
    expect(screen.getByTestId('mock-provider')).toBeInTheDocument();
    
    // Check if the child is inside the provider
    expect(screen.getByTestId('mock-provider')).toContainElement(
      screen.getByTestId('test-child')
    );
  });
});