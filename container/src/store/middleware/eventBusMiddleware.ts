import { Middleware } from '@reduxjs/toolkit';
import eventBus, { EVENT_TYPES } from '../../services/eventBus';
import { RootState } from '../index';

// Middleware to emit events when state changes
export const eventBusMiddleware: Middleware<{}, RootState> = 
  (store) => (next) => (action) => {
    // Get previous state
    const prevState = store.getState();
    
    // Execute the action
    const result = next(action);
    
    // Get new state after action
    const newState = store.getState();
    
    // Provider changes are handled directly in the slice
    // No need to emit here as providersSlice already emits the correct event format
    
    // Check for menu changes
    if (prevState.menu.selectedMenuItem !== newState.menu.selectedMenuItem) {
      eventBus.emit(EVENT_TYPES.MENU_CHANGED, {
        oldMenuItem: prevState.menu.selectedMenuItem,
        newMenuItem: newState.menu.selectedMenuItem,
        action: action.type,
      });
    }
    
    // Check for counter changes
    if (prevState.counter.value !== newState.counter.value) {
      eventBus.emit(EVENT_TYPES.COUNTER_CHANGED, {
        oldValue: prevState.counter.value,
        newValue: newState.counter.value,
        action: action.type,
      });
    }
    
    return result;
  }; 