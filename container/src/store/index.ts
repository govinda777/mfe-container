import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import productReducer from "./features/product/productSlice";
import providersReducer from "./features/providers/providersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    providers: providersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
