import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProvidersState } from "../../../types/storeState";

const initialState: ProvidersState = {
  selectedProvider: "provider1",
};

export const providersSlice = createSlice({
  name: "providers",
  initialState,
  reducers: {
    setSelectedProvider: (state, action: PayloadAction<string>) => {
      state.selectedProvider = action.payload;
    },
  },
});

export const { setSelectedProvider } = providersSlice.actions;

export default providersSlice.reducer;