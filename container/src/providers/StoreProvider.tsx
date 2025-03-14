import React, { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

// Extend Window interface to include store property
declare global {
  interface Window {
    store?: typeof store;
  }
}

export default function ReduxProvider({ children }: PropsWithChildren) {
  // Expose store to window object for testing purposes
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      window.store = store;
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
