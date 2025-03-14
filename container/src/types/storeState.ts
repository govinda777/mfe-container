// INFO (serif) : Product State Types
export interface ProductItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductState {
  products: ProductItem[];
}

// INFO (serif) : Counter State Types

export interface CounterState {
  value: number;
}
