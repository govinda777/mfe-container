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
