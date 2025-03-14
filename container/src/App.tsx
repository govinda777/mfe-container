import React, { Suspense } from "react";
import * as ReactDOMClient from "react-dom/client";

import "./index.css";
import StoreProvider from "./providers/StoreProvider";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";
import { useStoreSelector } from "./hooks/useStoreSelector";

const TestPage = React.lazy(() => import("remote/TestPage"));

const App = () => {
  const { selectedMenuItem } = useStoreSelector((state) => state.menu);

  // Function to render the appropriate component based on the selected menu item
  const renderContent = () => {
    switch (selectedMenuItem) {
      case "home":
        return <TestPage />;
      case "products":
        return <div className="p-4">Products Page Content</div>;
      case "about":
        return <div className="p-4">About Page Content</div>;
      case "contact":
        return <div className="p-4">Contact Page Content</div>;
      default:
        return <TestPage />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navbar with combo */}
      <header className="w-full z-10">
        <Navbar className="border-b" />
      </header>
      
      {/* Main content area with side menu and MFE */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left side menu */}
        <aside className="w-64 border-r shadow-sm">
          <SideMenu />
        </aside>
        
        {/* Center content area with MFE */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-6 overflow-auto">
            <div className="bg-white rounded-lg shadow-sm p-4 max-w-5xl mx-auto">
              <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
                {renderContent()}
              </Suspense>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="bg-white border-t p-4 shadow-inner">
            <div className="container mx-auto">
              <h2 className="text-xl font-bold text-center">Footer</h2>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container!);

root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
