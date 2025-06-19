// Event Bus Service for Micro Frontend Communication
type EventCallback = (data: any) => void;

class EventBus {
  private events: Map<string, EventCallback[]> = new Map();

  // Subscribe to an event
  subscribe(eventName: string, callback: EventCallback): () => void {
    console.log(`[EventBus] Subscribing to event: ${eventName}`);
    
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    
    this.events.get(eventName)!.push(callback);
    console.log(`[EventBus] Total subscribers for ${eventName}:`, this.events.get(eventName)!.length);
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.events.get(eventName);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
          console.log(`[EventBus] Unsubscribed from ${eventName}`);
        }
      }
    };
  }

  // Emit an event
  emit(eventName: string, data?: any): void {
    console.log(`[EventBus] Emitting event: ${eventName}`, data);
    
    const callbacks = this.events.get(eventName);
    if (callbacks && callbacks.length > 0) {
      console.log(`[EventBus] Found ${callbacks.length} subscribers for ${eventName}`);
      callbacks.forEach((callback, index) => {
        try {
          console.log(`[EventBus] Calling subscriber ${index + 1} for ${eventName}`);
          callback(data);
        } catch (error) {
          console.error(`[EventBus] Error in subscriber ${index + 1} for ${eventName}:`, error);
        }
      });
    } else {
      console.warn(`[EventBus] No subscribers found for event: ${eventName}`);
    }
  }

  // Remove all listeners for an event
  removeAllListeners(eventName: string): void {
    this.events.delete(eventName);
  }

  // Remove all listeners
  clear(): void {
    this.events.clear();
  }
}

// Make it available globally for micro frontends
declare global {
  interface Window {
    __MFE_EVENT_BUS__: EventBus;
  }
}

// Create or get the global singleton instance
let eventBus: EventBus;

if (typeof window !== 'undefined') {
  if (!window.__MFE_EVENT_BUS__) {
    console.log("[EventBus] Creating new global EventBus instance");
    window.__MFE_EVENT_BUS__ = new EventBus();
  } else {
    console.log("[EventBus] Using existing global EventBus instance");
  }
  eventBus = window.__MFE_EVENT_BUS__;
} else {
  // Fallback for server-side rendering
  eventBus = new EventBus();
}

export default eventBus;

// Event types for better type safety
export interface ProviderChangedEvent {
  selectedProvider: string;
}

export const EVENT_TYPES = {
  PROVIDER_CHANGED: 'PROVIDER_CHANGED',
  COUNTER_UPDATED: 'COUNTER_UPDATED',
  MENU_CHANGED: 'MENU_CHANGED',
} as const; 