import { renderHook } from '@testing-library/react';
import useStore from './useStore';
import * as useStoreDispatchModule from './useStoreDispatch';
import * as counterSlice from '../store/features/counter/counterSlice';
import * as productSlice from '../store/features/product/productSlice';
import * as providersSlice from '../store/features/providers/providersSlice';
import * as menuSlice from '../store/features/menu/menuSlice';

// Mock the action creators
jest.mock('../store/features/counter/counterSlice', () => ({
  increment: jest.fn(() => ({ type: 'counter/increment' })),
  decrement: jest.fn(() => ({ type: 'counter/decrement' })),
  incrementByAmount: jest.fn((amount) => ({ type: 'counter/incrementByAmount', payload: amount })),
}));

jest.mock('../store/features/product/productSlice', () => ({
  getAllProduct: jest.fn(() => ({ type: 'product/getAllProduct' })),
}));

jest.mock('../store/features/providers/providersSlice', () => ({
  setSelectedProvider: jest.fn((provider) => ({ type: 'providers/setSelectedProvider', payload: provider })),
}));

jest.mock('../store/features/menu/menuSlice', () => ({
  setSelectedMenuItem: jest.fn((menuItem) => ({ type: 'menu/setSelectedMenuItem', payload: menuItem })),
}));

describe('useStore Hook', () => {
  // Mock the dispatch function
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Mock the useStoreDispatch hook
    jest.spyOn(useStoreDispatchModule, 'useStoreDispatch').mockReturnValue(mockDispatch);

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('incrementCounter dispatches the increment action', () => {
    const { result } = renderHook(() => useStore());
    
    // Call the incrementCounter function
    result.current.incrementCounter();
    
    // Check if dispatch was called with the increment action
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'counter/increment' });
    expect(counterSlice.increment).toHaveBeenCalled();
  });

  test('decrementCounter dispatches the decrement action', () => {
    const { result } = renderHook(() => useStore());
    
    // Call the decrementCounter function
    result.current.decrementCounter();
    
    // Check if dispatch was called with the decrement action
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'counter/decrement' });
    expect(counterSlice.decrement).toHaveBeenCalled();
  });

  test('incrementByAmountCounter dispatches the incrementByAmount action with the correct amount', () => {
    const { result } = renderHook(() => useStore());
    
    // Call the incrementByAmountCounter function with an amount
    result.current.incrementByAmountCounter(5);
    
    // Check if dispatch was called with the incrementByAmount action and the correct amount
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'counter/incrementByAmount', payload: 5 });
    expect(counterSlice.incrementByAmount).toHaveBeenCalledWith(5);
  });

  test('getProductList dispatches the getAllProduct action', () => {
    const { result } = renderHook(() => useStore());
    
    // Call the getProductList function
    result.current.getProductList();
    
    // Check if dispatch was called with the getAllProduct action
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'product/getAllProduct' });
    expect(productSlice.getAllProduct).toHaveBeenCalled();
  });

  test('changeProvider dispatches the setSelectedProvider action with the correct provider', () => {
    const { result } = renderHook(() => useStore());
    
    // Call the changeProvider function with a provider
    result.current.changeProvider('provider1');
    
    // Check if dispatch was called with the setSelectedProvider action and the correct provider
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'providers/setSelectedProvider', payload: 'provider1' });
    expect(providersSlice.setSelectedProvider).toHaveBeenCalledWith('provider1');
  });

  test('changeMenuItem dispatches the setSelectedMenuItem action with the correct menuItem', () => {
    const { result } = renderHook(() => useStore());
    
    // Call the changeMenuItem function with a menuItem
    result.current.changeMenuItem('home');
    
    // Check if dispatch was called with the setSelectedMenuItem action and the correct menuItem
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'menu/setSelectedMenuItem', payload: 'home' });
    expect(menuSlice.setSelectedMenuItem).toHaveBeenCalledWith('home');
  });
});