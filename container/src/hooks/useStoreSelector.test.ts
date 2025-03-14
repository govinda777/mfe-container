/// <reference types="jest" />
import { renderHook } from '@testing-library/react';
import { useStoreSelector } from './useStoreSelector';
import { RootState } from '../store';

// Mock the react-redux module
jest.mock('react-redux', () => ({
  useSelector: jest.fn((selector) => selector(mockState)),
}));

// Create a mock state that matches the structure of RootState
const mockState: RootState = {
  counter: { value: 10 },
  providers: { selectedProvider: 'provider1' },
  menu: { selectedMenuItem: 'home' },
  product: { products: [] },
};

describe('useStoreSelector Hook', () => {
  test('selects the correct state from the store', () => {
    // Render the hook
    const { result } = renderHook(() => useStoreSelector(state => state));

    // Check if the selected state matches the mock state
    expect(result.current).toEqual(mockState);
  });

  test('selects a specific part of the state', () => {
    // Render the hook and select a specific part of the state
    const { result } = renderHook(() => useStoreSelector(state => state.counter));

    // Check if the selected state matches the expected value
    expect(result.current).toEqual({ value: 10 });
  });

  test('selects a nested property from the state', () => {
    // Render the hook and select a nested property
    const { result } = renderHook(() => useStoreSelector(state => state.counter.value));

    // Check if the selected state matches the expected value
    expect(result.current).toBe(10);
  });
});