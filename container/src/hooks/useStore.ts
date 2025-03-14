import { useStoreDispatch } from "./useStoreDispatch";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../store/features/counter/counterSlice";
import { getAllProduct } from "../store/features/product/productSlice";
import { setSelectedProvider } from "../store/features/providers/providersSlice";
import { setSelectedMenuItem } from "../store/features/menu/menuSlice";

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

  const changeProvider = (provider: string) => {
    dispatch(setSelectedProvider(provider));
  };

  const changeMenuItem = (menuItem: string) => {
    dispatch(setSelectedMenuItem(menuItem));
  };

  return {
    incrementCounter,
    decrementCounter,
    incrementByAmountCounter,
    getProductList,
    changeProvider,
    changeMenuItem,
  };
}
