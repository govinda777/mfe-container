import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProvidersState } from "../../../types/storeState";
import eventBus, { EVENT_TYPES, ProviderChangedEvent } from "../../../services/eventBus";

const initialState: ProvidersState = {
  selectedProvider: "provider1",
};

export const providersSlice = createSlice({
  name: "providers",
  initialState,
  reducers: {
    setSelectedProvider: (state, action: PayloadAction<string>) => {
      console.log("[ProvidersSlice] Changing provider from", state.selectedProvider, "to", action.payload);
      
      state.selectedProvider = action.payload;
      
      // Emit event bus event for micro frontends
      const eventData: ProviderChangedEvent = {
        selectedProvider: action.payload
      };
      
      console.log("[ProvidersSlice] Emitting event:", EVENT_TYPES.PROVIDER_CHANGED, eventData);
      eventBus.emit(EVENT_TYPES.PROVIDER_CHANGED, eventData);
      console.log("[ProvidersSlice] Event emitted successfully");
    },
  },
});

export const { setSelectedProvider } = providersSlice.actions;

export default providersSlice.reducer;