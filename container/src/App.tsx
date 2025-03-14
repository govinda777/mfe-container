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
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <SideMenu />
        <div className="flex flex-col flex-1">
          <div className="flex-1 p-4 overflow-auto">
            <Suspense fallback={<div>Loading...</div>}>
              {renderContent()}
            </Suspense>
          </div>
          <div className="bg-gray-100 p-4 border-t">
            <div className="container mx-auto">
              <h2 className="text-2xl font-bold text-center">Footer</h2>
            </div>
          </div>
        </div>
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
