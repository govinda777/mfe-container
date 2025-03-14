import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductItem, ProductState } from "../../../types/storeState";
import { getProductList } from "../../../services/product";

const initialState: ProductState = {
  products: [],
};

export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async () => {
    try {
      const list = await getProductList();
      return list.products;
    } catch (error) {
      throw new Error("Error while fetching products");
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductItem[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
