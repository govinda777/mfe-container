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
    changeProvider: (provider: string) => void;
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
  export interface ProvidersState {
    selectedProvider: string;
  }
}

declare module "container/hooks/useStoreSelector" {
  import type { CounterState, ProductState, ProvidersState } from "container/types/storeState";
  export type RootState = {
    counter: CounterState;
    product: ProductState;
    providers: ProvidersState;
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

declare module "container/services/eventBus" {
  export interface ProviderChangedEvent {
    selectedProvider: string;
  }
  
  export const EVENT_TYPES: {
    PROVIDER_CHANGED: 'PROVIDER_CHANGED';
    COUNTER_UPDATED: 'COUNTER_UPDATED';
    MENU_CHANGED: 'MENU_CHANGED';
  };
}

// Global EventBus type
interface EventBus {
  subscribe(eventName: string, callback: (data: any) => void): () => void;
  emit(eventName: string, data?: any): void;
  removeAllListeners(eventName: string): void;
  clear(): void;
}

// Redux Store type
interface ReduxStore {
  getState(): {
    providers?: {
      selectedProvider: string;
    };
    [key: string]: any;
  };
  dispatch: (action: any) => void;
}

declare global {
  interface Window {
    __MFE_EVENT_BUS__: EventBus;
    store?: ReduxStore;
  }
}
