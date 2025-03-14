import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MenuState } from "../../../types/storeState";

const initialState: MenuState = {
  selectedMenuItem: "home",
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSelectedMenuItem: (state, action: PayloadAction<string>) => {
      state.selectedMenuItem = action.payload;
    },
  },
});

export const { setSelectedMenuItem } = menuSlice.actions;

export default menuSlice.reducer;