import React, { useState, useEffect } from "react";

// Import event types from container
import { EVENT_TYPES, ProviderChangedEvent } from "container/services/eventBus";

// Extend window interface for TypeScript
declare global {
  interface Window {
    __MFE_EVENT_BUS__: any;
    store?: any;
  }
}

const TestPage: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<string>("Loading...");
  const [eventHistory, setEventHistory] = useState<Array<{
    timestamp: string;
    provider: string;
  }>>([]);

  // Force re-render when selectedProvider changes
  console.log("[TestPage] Current selectedProvider state:", selectedProvider);

  useEffect(() => {
    console.log("[Remote Event Bus TestPage] Initializing component...");

    let mounted = true;

    const initializeAndSubscribe = () => {
      // Set initial value
      setSelectedProvider("provider2"); // Force initial value
      console.log("[TestPage] Set initial provider to provider2");

      if (window.__MFE_EVENT_BUS__) {
        console.log("[Remote Event Bus TestPage] Global EventBus found");

        // Try to get current value from store
        if (window.store?.getState) {
          try {
            const state = window.store.getState();
            const currentProvider = state.providers?.selectedProvider;
            if (currentProvider && mounted) {
              console.log("[TestPage] Got provider from store:", currentProvider);
              setSelectedProvider(currentProvider);
            }
          } catch (error) {
            console.log("[TestPage] Could not get state from store");
          }
        }

        // Subscribe to changes
        const unsubscribe = window.__MFE_EVENT_BUS__.subscribe(
          EVENT_TYPES.PROVIDER_CHANGED, 
          (data: any) => {
            if (mounted) {
              console.log("[TestPage] RECEIVED EVENT - RAW DATA:", data);
              console.log("[TestPage] data type:", typeof data);
              console.log("[TestPage] data.selectedProvider:", data?.selectedProvider);
              
              // Extract provider value safely - only accept strings
              let providerValue: string | null = null;
              
              if (typeof data === 'string') {
                providerValue = data;
              } else if (data && typeof data.selectedProvider === 'string') {
                providerValue = data.selectedProvider;
              } else if (data && typeof data.newProvider === 'string') {
                // Handle middleware format as fallback
                providerValue = data.newProvider;
              }
              
              console.log("[TestPage] Extracted provider value:", providerValue);
              
              if (providerValue && typeof providerValue === 'string') {
                console.log("[TestPage] Setting selectedProvider to:", providerValue);
                setSelectedProvider(prevState => {
                  console.log("[TestPage] Previous state:", prevState, "New state:", providerValue);
                  return providerValue;
                });
                
                // Add to history
                setEventHistory(prev => {
                  const newEvent = {
                    timestamp: new Date().toLocaleTimeString(),
                    provider: providerValue
                  };
                  console.log("[TestPage] Adding to history:", newEvent);
                  return [...prev, newEvent].slice(-5);
                });
              } else {
                console.error("[TestPage] No valid string provider value in event data:", data);
              }
            }
          }
        );

        console.log("[TestPage] Subscribed to events");
        return unsubscribe;
      }
      return null;
    };

    // Try immediately
    const unsubscribe = initializeAndSubscribe();
    
    if (!unsubscribe) {
      // Retry
      const timeout = setTimeout(() => {
        if (mounted) {
          initializeAndSubscribe();
        }
      }, 200);
      
      return () => {
        mounted = false;
        clearTimeout(timeout);
      };
    }

    return () => {
      mounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Remote Event Bus Demo</h1>
        <p className="text-blue-100">
          This micro frontend receives data from the container via Event Bus (no StoreProvider!)
        </p>
      </div>

      {/* MAIN PROVIDER DISPLAY - SIMPLIFIED */}
      <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4">🎯 Current Provider</h2>
        <div className="text-4xl font-bold text-yellow-900">
          {selectedProvider || "NO VALUE"}
        </div>
        <p className="text-yellow-700 mt-2">
          Via Event Bus • State: {selectedProvider}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event History */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Event History</h2>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {eventHistory.length === 0 ? (
              <p className="text-gray-500 text-sm">No events received yet</p>
            ) : (
              eventHistory.map((event, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                  <span className="font-medium">{event.timestamp}</span>
                  <span className="ml-2 text-gray-600">→</span>
                  <span className="ml-2 text-blue-600 font-bold">{event.provider}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Debug Info */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Debug Info</h3>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600">Current Provider: <code className="bg-gray-200 px-1 rounded font-bold">{selectedProvider}</code></p>
            <p className="text-gray-600">Events Received: <code className="bg-gray-200 px-1 rounded">{eventHistory.length}</code></p>
            <p className="text-gray-600">EventBus Available: <code className="bg-gray-200 px-1 rounded">{typeof window !== 'undefined' && window.__MFE_EVENT_BUS__ ? 'Yes' : 'No'}</code></p>
            <p className="text-gray-600">Component Rendered: <code className="bg-gray-200 px-1 rounded">{new Date().toLocaleTimeString()}</code></p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 text-blue-800">How to Test</h2>
        <ol className="list-decimal list-inside space-y-2 text-blue-700">
          <li>Go to the container's Navbar</li>
          <li>Use the Provider selector dropdown</li>
          <li>Change the selected provider</li>
          <li>Watch this page update in real-time via Event Bus!</li>
        </ol>
      </div>
    </div>
  );
};

export default TestPage;
