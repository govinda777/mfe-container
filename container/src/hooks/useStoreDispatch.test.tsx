/// <reference types="jest" />
import { renderHook } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { useStoreDispatch } from './useStoreDispatch';
import React, { ReactNode } from 'react';

// Mock dispatch function
const mockDispatch = jest.fn();

// Mock the react-redux module
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
  Provider: ({ children }: { children: ReactNode }) => <div data-testid="mock-provider">{children}</div>
}));

describe('useStoreDispatch Hook', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('returns the dispatch function', () => {
    // Render the hook
    const { result } = renderHook(() => useStoreDispatch());
    
    // Check if the returned dispatch function is the same as the mock dispatch function
    expect(result.current).toBe(mockDispatch);
    
    // Check if the dispatch function can be called
    expect(typeof result.current).toBe('function');
  });
  
  test('can dispatch actions', () => {
    // Render the hook
    const { result } = renderHook(() => useStoreDispatch());
    
    // Dispatch an action
    result.current({ type: 'TEST_ACTION' });
    
    // Check if the dispatch function was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'TEST_ACTION' });
  });
});