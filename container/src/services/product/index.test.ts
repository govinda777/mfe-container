/// <reference types="jest" />
import { getProductList } from './index';
import { ProductListResponse } from './types';

describe('Product Service', () => {
  // Save the original fetch function
  const originalFetch = global.fetch;

  // Mock data for testing
  const mockProductListResponse: ProductListResponse = {
    products: [
      {
        id: 1,
        title: 'Test Product',
        description: 'Test Description',
        price: 100,
        discountPercentage: 10,
        rating: 4.5,
        stock: 50,
        brand: 'Test Brand',
        category: 'Test Category',
        thumbnail: 'test-thumbnail.jpg',
        images: ['test-image-1.jpg', 'test-image-2.jpg'],
      },
    ],
    limit: 10,
    skip: 0,
    total: 1,
  };

  beforeEach(() => {
    // Mock the global fetch function
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockProductListResponse),
    });
  });

  afterEach(() => {
    // Restore the original fetch function
    global.fetch = originalFetch;
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  test('getProductList fetches data from the correct URL', async () => {
    await getProductList();
    
    // Check if fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('https://dummyjson.com/products');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('getProductList returns the expected data', async () => {
    const result = await getProductList();
    
    // Check if the result matches the mock data
    expect(result).toEqual(mockProductListResponse);
  });

  test('getProductList handles errors correctly', async () => {
    // Mock fetch to reject with an error
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    
    // Check if getProductList throws the error
    await expect(getProductList()).rejects.toThrow('Network error');
  });
});