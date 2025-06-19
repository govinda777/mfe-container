import React, { useState, useEffect } from "react";

import "./index.css";

import * as ReactDOMClient from "react-dom/client";

import Button from "container/Button";

// Import event types from container
import { EVENT_TYPES, ProviderChangedEvent } from "container/services/eventBus";

console.log("[Remote Event Bus App] Button:", Button);
console.log("[Remote Event Bus App] EVENT_TYPES:", EVENT_TYPES);

const App = () => {
  const [selectedProvider, setSelectedProvider] = useState<string>("Loading...");

  useEffect(() => {
    console.log("[Remote Event Bus App] Component mounted, checking for global EventBus...");
    
    // Get initial value and subscribe to changes
    const initializeProvider = () => {
      // Try to get initial value from container store
      if (window.store?.getState) {
        try {
          const state = window.store.getState();
          const initialProvider = state.providers?.selectedProvider || "provider1";
          console.log("[Remote Event Bus App] Got initial provider:", initialProvider);
          setSelectedProvider(initialProvider);
        } catch (error) {
          console.log("[Remote Event Bus App] Could not get initial state, using default");
          setSelectedProvider("provider1");
        }
      } else {
        setSelectedProvider("provider1");
      }

      // Subscribe to changes
      if (window.__MFE_EVENT_BUS__) {
        const unsubscribe = window.__MFE_EVENT_BUS__.subscribe(
          EVENT_TYPES.PROVIDER_CHANGED, 
          (data: ProviderChangedEvent) => {
            console.log("[Remote Event Bus App] Provider changed event received:", data);
            setSelectedProvider(data.selectedProvider);
          }
        );

        console.log("[Remote Event Bus App] Subscribed to PROVIDER_CHANGED events");
        return unsubscribe;
      }
      return null;
    };

    // Try immediately
    const unsubscribe = initializeProvider();
    
    if (!unsubscribe) {
      // Retry after delay
      const timeout = setTimeout(() => {
        const retryUnsubscribe = initializeProvider();
        if (retryUnsubscribe) {
          console.log("[Remote Event Bus App] EventBus found on retry");
        }
      }, 500); // Increased delay
      
      return () => clearTimeout(timeout);
    }

    // Cleanup subscription on unmount
    return () => {
      console.log("[Remote Event Bus App] Cleaning up subscription");
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 text-3xl text-blue-600">
      <div>Name: remote-event-bus</div>
      <div>Framework: react</div>
      <div>Language: TypeScript</div>
      <div>CSS: Tailwind</div>
      <div className="mt-4 p-4 bg-yellow-100 rounded">
        <div className="text-lg text-yellow-800">
          Current Provider (via Event Bus): <strong className="text-2xl text-yellow-900">{selectedProvider}</strong>
        </div>
        <div className="text-sm text-yellow-600 mt-2">
          This value is received from the container via event bus communication
        </div>
      </div>
      <Button />
    </div>
  );
};

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container!);

// Remove StoreProvider - we're using event bus now!
root.render(<App />);
