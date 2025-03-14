import { ProductItem } from "../../types/storeState";

export type ProductListResponse = {
  products: ProductItem[];
  limit: number;
  skip: number;
  total: number;
};
