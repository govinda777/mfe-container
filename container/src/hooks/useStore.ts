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
