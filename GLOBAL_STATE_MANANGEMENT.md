[Project Repository](https://github.com/serifcolakel/mf-template)

🚨 This article based on [this](https://dev.to/serifcolakel/mastering-micro-frontends-creating-scalable-applications-with-react-webpack-5-and-typescript-type-safety-3l7j) article. I just added some extra features.

[Author](https://dev.to/serifcolakel)

In today's rapidly evolving world of web development, embracing micro front-end architecture has become a strategic imperative. This article presents a comprehensive guide that navigates through the intricate landscape of micro front-ends, demonstrating how to seamlessly integrate Redux and Redux Toolkit to efficiently manage global states. As we delve into the heart of this guide, you'll embark on a journey to streamline your development process, centralize state management, and amplify user experiences. By the end, you'll possess the knowledge to effectively reshape your architecture, yielding applications that are not only modular and scalable but also infused with the power of Redux-driven state management.

## ReduxToolkit and React-Redux installation

In this section we will install redux and react-redux. Run the following command in the terminal: [reference](https://redux-toolkit.js.org/tutorials/intermediate-tutorial#installing-redux-toolkit-and-react-redux)

```bash
npm install @reduxjs/toolkit react-redux
```

## Redux Store Configuration

- Create a folder called `store` in the `src` folder and create a file called `index.ts` inside it. You can run the following command in the terminal to create the folder and file:

```bash
mkdir src/store && touch src/store/index.ts
```

- Copy the following code into the `index.ts` file [reference](https://redux-toolkit.js.org/tutorials/intermediate-tutorial#creating-the-store):

```ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## First Feature Slice (Counter)

- Create a folder called `features` in the `src/store` folder and create a file called `counter/counterSlice.ts` inside it. You can run the following command in the terminal to create the folder and file:

```bash
mkdir src/store/features/counter && touch src/store/features/counter/counterSlice.ts
```

- Copy the following code into the `counterSlice.ts` file:

```ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

## Creating a Types for the Store State

In this section we will create a types for the store state. Create a file called `storeState.ts` in the `src/types` folder. You can run the following command in the terminal to create the file:

```bash
touch src/types/storeState.ts
```

- Copy the following code into the `storeState.ts` file:

```ts
// INFO (serif) : Counter State Types

export interface CounterState {
  value: number;
}
```

## Generate Types with @cloudbeds/webpack-module-federation-types-plugin (Optional)

In this section we will generate types for the store state. `federation.config.json` file is already configured to like below:

```json
{
  "name": "container",
  "exposes": {
    "./Button": "./src/components/Button.tsx",
    "./types/storeState": "./src/types/storeState.ts"
  }
}
```

- Run the following command in the terminal to generate types:

```bash
npx make-federated-types
```

- `container.d.ts` looks like below:

```ts
// other types
declare module "container/types/storeState" {
  export interface CounterState {
    value: number;
  }
}
// other types
```

🎉 Congratulations! You have successfully generated types for the store state. After copy to the  `container.d.ts` file in `remote` application.

## Creating Hooks for Store

In this section we will create a custom hook to access the store and dispatch actions. Create a file called `useStore.ts` in the `src/hooks` folder. You can run the following command in the terminal to create the file:

```bash
touch src/hooks/useStore.ts
```

- Copy the following code into the `useStore.ts` file:

```ts
import { useStoreDispatch } from "./useStoreDispatch";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../store/features/counter/counterSlice";

export default function useStore() {
  const dispatch = useStoreDispatch();
  const incrementCounter = () => {
    dispatch(increment());
  };
  const decrementCounter = () => {
    dispatch(decrement());
  };
  const incrementByAmountCounter = (amount: number) => {
    dispatch(incrementByAmount(amount));
  };
  return { incrementCounter, decrementCounter, incrementByAmountCounter };
}
```

- Create a file called `useStoreDispatch.ts` in the `src/hooks` folder. You can run the following command in the terminal to create the file:

```bash
touch src/hooks/useStoreDispatch.ts
```

- Copy the following code into the `useStoreDispatch.ts` file:

```ts
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

export const useStoreDispatch: () => AppDispatch = useDispatch;
```

- Create a file called `useStoreSelector.ts` in the `src/hooks` folder. You can run the following command in the terminal to create the file:

```bash
touch src/hooks/useStoreSelector.ts
```

- Copy the following code into the `useStoreSelector.ts` file:

```ts
import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store";

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Creating a Store Provider

In this section we will create a store provider component to wrap the application with. Create a file called `StoreProvider.tsx` in the `src/providers` folder. You can run the following command in the terminal to create the file:

```bash
touch src/providers/StoreProvider.tsx
```

- Copy the following code into the `StoreProvider.tsx` file:

```tsx
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export default function ReduxProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
```

## Wrapping the App with the Store Provider

In this section we will wrap the application with the store provider. Open the `src/index.tsx` file and wrap the `App` component with the `StoreProvider` component and it should look like the following:

```tsx
import React, { Suspense } from "react";
import * as ReactDOMClient from "react-dom/client";

import "./index.css";
import StoreProvider from "./providers/StoreProvider";
const TestPage = React.lazy(() => import("remote/TestPage")); //? remote is the name of the container

const App = () => (
  <div className="max-w-6xl mx-auto mt-10 text-3xl text-red-600">
    <div>Name: container</div>
    <div>Framework: React</div>
    <div>Language: TypeScript</div>
    <div>CSS: Tailwind</div>
    <Suspense fallback={<div>Loading...</div>}>
      <TestPage />
    </Suspense>
  </div>
);

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container!);

root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
```

## Export the Store, Store Selector and Store Provider in webpack

In this section we will export the store, store selector and store provider in webpack. Open the `webpack.config.js` file and add the following code to the `exposes` object:

```js
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const configs = {
  appName: "container",
  appFileName: "remoteEntry.js",
  development: {
    PUBLIC_PATH: "http://localhost:3000/",
    REMOTE_PATH: "remote@http://localhost:3001/remoteEntry.js",
    PORT: 3000,
  },
  production: {
    PUBLIC_PATH: "http://localhost:3000/",
    REMOTE_PATH: "remote@http://localhost:3001/remoteEntry.js",
    PORT: 3000,
  },
};

const deps = require("./package.json").dependencies;

module.exports = (env, argv) => {
  console.log({ env, argv, configs: configs[argv.mode] });

  return {
    output: {
      publicPath: configs[argv.mode].PUBLIC_PATH,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      hot: true,
      port: configs[argv.mode].PORT,
      historyApiFallback: true,
      allowedHosts: "all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: configs.appName,
        filename: configs.appFileName,
        remotes: {
          remote: configs[argv.mode].REMOTE_PATH,
        },
        exposes: {
          "./Button": "./src/components/Button.tsx",
          // INFO (serif) : We are exposing the store, store selector and store provider here
          "./hooks/useStore": "./src/hooks/useStore.ts",
          "./hooks/useStoreSelector": "./src/hooks/useStoreSelector.ts",
          "./providers/StoreProvider": "./src/providers/StoreProvider.tsx",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
```

🎉 Congratulations! You have successfully configured Redux in your application.

## Next Step is to use the store in the remote application

In this section we will use the store in the remote application.

- Firstly, we will define the type of the `useStore` hook in the `container.d.ts` file:

```ts
declare module "container/hooks/useStore" {
  function useStore(): {
    incrementCounter: () => void;
    decrementCounter: () => void;
    incrementByAmountCounter: (amount: number) => void;
  };

  export default useStore;
}
```

- Secondly, we will define the type of the `useStoreSelector` hook in the `container.d.ts` file:

```ts
declare module "container/hooks/useStoreSelector" {
  import type { CounterState, ProductState } from "container/types/storeState";
  export type RootState = {
    counter: CounterState;
    product: ProductState;
  };

  export interface TypedUseSelectorHook<TState> {
    <TSelected>(selector: (state: TState) => TSelected): TSelected;
    <Selected = unknown>(selector: (state: TState) => Selected): Selected;
  }

  export const useStoreSelector: TypedUseSelectorHook<RootState>;
}
```

- Lastly, we will define the type of the `StoreProvider` component in the `container.d.ts` file:

```ts
declare module "container/providers/StoreProvider" {
  import React from "react";

  type Props = {
    children: React.ReactNode;
  };
  export default function StoreProvider({ children }: Props): JSX.Element;
}
```

## Wrap the App with the Store Provider

In this section we will wrap the application with the store provider. Open the `src/App.tsx` file and wrap the `App` component with the `StoreProvider` component and it should look like the following:

```tsx
import React from "react";

import "./index.css";

import * as ReactDOMClient from "react-dom/client";

import Button from "container/Button";
import StoreProvider from "container/providers/StoreProvider";
console.log(Button);

const App = () => (
  <div className="max-w-6xl mx-auto mt-10 text-3xl text-blue-600">
    <div>Name: remote</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Tailwind</div>
    <Button />
  </div>
);

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container!);

root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
```

## Use the store in the remote application

In this section we will use the store in the remote application. Open the `src/pages/test/index.tsx` file and add the following code:

```tsx
import Button from "container/Button";
import useStore from "container/hooks/useStore";
import { useStoreSelector } from "container/hooks/useStoreSelector";
import React from "react";

export default function TestPage() {
  const {
    decrementCounter,
    incrementByAmountCounter,
    incrementCounter,
    getProductList,
  } = useStore();
  const {
    counter: { value },
    product: { products },
  } = useStoreSelector((state) => state);
  return (
    <div className="p-2 space-y-2 border">
      <label className="text-black">Test Page From Remote Application</label>
      <p>counter value : {value}</p>
      <section className="flex flex-row gap-x-4">
        <Button
          label="Decrement"
          buttonType={"error"}
          onClick={decrementCounter}
        />
        <Button
          label="Increment"
          buttonType={"primary"}
          onClick={incrementCounter}
        />
        <Button
          label="Increment by 5"
          buttonType={"warning"}
          onClick={() => incrementByAmountCounter(5)}
        />
        <Button
          label="Decrement by 5"
          buttonType={"info"}
          onClick={() => incrementByAmountCounter(-5)}
        />
        <Button
          label="Get All Product"
          buttonType={"secondary"}
          onClick={getProductList}
        />
      </section>
      <section className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            className="flex flex-col items-center justify-center text-center text-black border-2 border-gray-300 rounded-lg gap-y-4"
            key={product.id}
          >
            <div>{product.brand}</div>
            <img
              src={product.images[0]}
              className="object-contain w-24 h-24"
              alt={product.brand}
            />
            <em>{product.price} $</em>
          </div>
        ))}
      </section>
    </div>
  );
}
```

🎉 Congratulations! You have successfully configured Redux in your application.

## Create Async Thunk in the Container Application

In this section we will use the `createAsyncThunk` function in the container application.

- Firstly, we will create a `service` for the `product` in the `src/services` file and name it `product/index` and add the following code:

```ts
import { ProductListResponse } from "./types";

export const getProductList = async (): Promise<ProductListResponse> => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data;
};
```

- Add the `ProductItem` & `ProducState` type in the `src/types/storeState` file and it should look like the following:

```ts
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
// other types
```

- Create type for the `product` in the `src/services/product/types` file and name it `index` and add the following code:

```ts
import { ProductItem } from "../../types/storeState";

export type ProductListResponse = {
  products: ProductItem[];
  limit: number;
  skip: number;
  total: number;
};
```

- We create new slice in the `src/store/features` file and name it `product` and add `productSlice.ts` file in it. The `productSlice.ts` file should look like the following:

```ts
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
```

- Add the `producSlice` to `src/store/index.ts` file should look like the following:

```ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import productReducer from "./features/product/productSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

- Add the `getAllProduct` to `useStore` hook in the `src/container/hooks/useStore` file and it should look like the following:

```ts
import { useStoreDispatch } from "./useStoreDispatch";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../store/features/counter/counterSlice";
import { getAllProduct } from "../store/features/product/productSlice";

export default function useStore() {
  const dispatch = useStoreDispatch();
  const incrementCounter = () => {
    dispatch(increment());
  };
  const decrementCounter = () => {
    dispatch(decrement());
  };
  const incrementByAmountCounter = (amount: number) => {
    dispatch(incrementByAmount(amount));
  };

  const getProductList = () => {
    dispatch(getAllProduct());
  };

  return {
    incrementCounter,
    decrementCounter,
    incrementByAmountCounter,
    getProductList,
  };
}
```

🎉 Congratulations! You have successfully added getAllProduct thunk in your application. Let's invoke the function on remote application.

## Invoke the getAllProduct thunk in the remote application

In this section we will invoke the `getAllProduct` thunk in the remote application.

- Firstly, we will update the `useStore` hook type on `container.d.ts` file and it should look like the following:

```ts
/* eslint-disable */
/// <reference types="react" />
declare module "container/Button" {
  import React, { ComponentProps } from "react";
  import { type VariantProps } from "class-variance-authority";
  type ButtonElementProps = ComponentProps<"button">;
  export interface ButtonProps
    extends ButtonElementProps,
      VariantProps<typeof buttonStyles> {
    label?: string;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    buttonWrapperClassName?: string;
  }
  const buttonStyles: (
    props?:
      | ({
          buttonType?:
            | "error"
            | "default"
            | "success"
            | "primary"
            | "secondary"
            | "warning"
            | "info"
            | null
            | undefined;
          size?: "default" | "sm" | "lg" | "xl" | "xxl" | null | undefined;
          padding?: "default" | "sm" | "lg" | "xl" | "xxl" | null | undefined;
          rounded?:
            | "none"
            | "default"
            | "full"
            | "sm"
            | "lg"
            | "xl"
            | "xxl"
            | null
            | undefined;
          isFullWidth?: boolean | null | undefined;
        } & import("class-variance-authority/dist/types").ClassProp)
      | undefined
  ) => string;
  function Button({
    label,
    buttonType,
    rounded,
    padding,
    size,
    isFullWidth,
    className,
    ...buttonProps
  }: ButtonProps): React.JSX.Element;
  export default Button;
}

declare module "container/hooks/useStore" {
  function useStore(): {
    incrementCounter: () => void;
    decrementCounter: () => void;
    incrementByAmountCounter: (amount: number) => void;
    getProductList: () => void;
  };

  export default useStore;
}

declare module "container/types/storeState" {
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
  export interface CounterState {
    value: number;
  }
}

declare module "container/hooks/useStoreSelector" {
  import type { CounterState, ProductState } from "container/types/storeState";
  export type RootState = {
    counter: CounterState;
    product: ProductState;
  };

  export interface TypedUseSelectorHook<TState> {
    <TSelected>(selector: (state: TState) => TSelected): TSelected;
    <Selected = unknown>(selector: (state: TState) => Selected): Selected;
  }

  export const useStoreSelector: TypedUseSelectorHook<RootState>;
}

declare module "container/providers/StoreProvider" {
  import React from "react";

  type Props = {
    children: React.ReactNode;
  };
  export default function StoreProvider({ children }: Props): JSX.Element;
}
```

- Now, we will invoke the `getProductList` function in the remote application. `src/pages/test/index.tsx` file and it should look like the following:

```tsx
import Button from "container/Button";
import useStore from "container/hooks/useStore";
import { useStoreSelector } from "container/hooks/useStoreSelector";
import React from "react";

export default function TestPage() {
  const {
    decrementCounter,
    incrementByAmountCounter,
    incrementCounter,
    getProductList,
  } = useStore();
  const {
    counter: { value },
    product: { products },
  } = useStoreSelector((state) => state);
  return (
    <div className="space-y-2 ">
      <section className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            className="flex flex-col items-center justify-center text-center text-black border-2 border-gray-300 rounded-lg gap-y-4"
            key={product.id}
          >
            <div>{product.brand}</div>
            <img
              src={product.images[0]}
              className="object-contain w-24 h-24"
              alt={product.brand}
            />
            <em>{product.price} $</em>
          </div>
        ))}
      </section>

      <h1 className="text-blue-600 md:text-gray-600">Test Page</h1>
      {value}
      <Button
        label="Decrement"
        buttonType={"error"}
        onClick={decrementCounter}
      />

      <Button
        label="Increment"
        buttonType={"primary"}
        onClick={incrementCounter}
      />
      <Button
        label="Increment by 5"
        buttonType={"warning"}
        onClick={() => incrementByAmountCounter(5)}
      />
      <Button
        label="Decrement by 5"
        buttonType={"info"}
        onClick={() => incrementByAmountCounter(-5)}
      />
      <Button
        label="Get All Product"
        buttonType={"secondary"}
        onClick={getProductList}
      />
    </div>
  );
}
```

## Run the Container & Remote Application

In this section we will run the application. Open the terminal and run the following command:

```bash
cd container && npm run start
cd remote && npm run start
```

🎉 Congratulations! You have successfully configured Redux in your application.

## Conclusion

**Redux and Redux Toolkit Installation**: You started by installing Redux and Redux Toolkit using the provided npm command.

**Redux Store Configuration**: You created a centralized Redux store configuration, setting up the initial state and reducers for the counter feature.

**Feature Slice Creation**: You created a feature slice for the counter, which encapsulates the state and reducers specific to the counter feature.

**Types for Store State**: You defined types for the store state in a separate file to ensure type safety throughout your application.

**Custom Hooks for Store**: You created custom hooks for accessing the store and dispatching actions, abstracting away the complexity of directly interacting with Redux.

**Store Provider Component**: You created a store provider component to wrap your application and provide access to the Redux store to all components within the app.

**Webpack Configuration**: You configured Webpack to expose the necessary hooks, components, and types, allowing your remote application to access the Redux-related functionality from the container.

**Async Thunk for Remote Application**: You expanded the functionality by adding an asynchronous thunk for fetching product data, demonstrating how to fetch data from a remote source and update the store.

**Using the Store in the Remote Application**: You showcased how to use the custom hooks and selectors in the remote application, incorporating Redux state management seamlessly into your micro front-end architecture.

**Running the Applications**: Finally, you learned how to run both the container and remote applications concurrently to see your Redux-powered micro front-end in action.

By following this guide, you've gained a solid understanding of how to effectively integrate Redux and Redux Toolkit into a micro front-end architecture, enhancing the maintainability, scalability, and user experience of your applications. This approach allows you to create independent and reusable components while managing the state centrally, leading to more organized and efficient development processes.

🙏 Thank you for reading this article. If you have any questions or suggestions, please feel free to reach out to me on [Twitter](https://twitter.com/ColakelSerif).
