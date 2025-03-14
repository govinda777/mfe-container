import { ProductListResponse } from "./types";

export const getProductList = async (): Promise<ProductListResponse> => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data;
};
