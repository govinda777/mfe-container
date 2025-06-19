import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import productReducer from "./features/product/productSlice";
import providersReducer from "./features/providers/providersSlice";
import menuReducer from "./features/menu/menuSlice";
import { eventBusMiddleware } from "./middleware/eventBusMiddleware";

// First define the rootReducer to avoid circular reference
const rootReducer = {
  counter: counterReducer,
  product: productReducer,
  providers: providersReducer,
  menu: menuReducer,
};

// Define types based on the rootReducer
export type RootState = {
  counter: ReturnType<typeof counterReducer>;
  product: ReturnType<typeof productReducer>;
  providers: ReturnType<typeof providersReducer>;
  menu: ReturnType<typeof menuReducer>;
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventBusMiddleware),
});

export type AppDispatch = typeof store.dispatch;
