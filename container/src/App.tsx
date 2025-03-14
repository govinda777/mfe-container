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

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "home":
        return <TestPage />;
      case "products":
        return <div>Products Page Content</div>;
      case "about":
        return <div>About Page Content</div>;
      case "contact":
        return <div>Contact Page Content</div>;
      default:
        return <TestPage />;
    }
  };

  return (
    <div>
      <Navbar />
      <SideMenu />
      <Suspense fallback={<div>Carregando...</div>}>
        {renderContent()}
      </Suspense>
      <footer>Footer</footer>
    </div>
  );
};

// Apenas renderiza no DOM real se **não** estiver rodando testes
if (typeof document !== "undefined") {
  const container = document.getElementById("app");
  if (container) {
    const root = ReactDOMClient.createRoot(container);
    root.render(
      <StoreProvider>
        <App />
      </StoreProvider>
    );
  }
}

export default App;
