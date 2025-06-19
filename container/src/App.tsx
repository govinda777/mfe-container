import React, { Suspense, lazy } from "react";
import * as ReactDOMClient from "react-dom/client";
import Layout from "antd/lib/layout";
import "antd/dist/reset.css"; 
import "./index.css";

import StoreProvider from "./providers/StoreProvider";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";
import { useStoreSelector } from "./hooks/useStoreSelector";
import FallbackTestPage from "./components/FallbackTestPage";

// Initialize event bus
import "./services/eventBus";

// Pegamos o TestPage remotamente com tratamento de erro
const TestPage = lazy(() => 
  import("remote/TestPage")
    .catch(() => {
      console.warn("Remote TestPage failed to load. Using fallback component.");
      // Use type assertion to resolve TypeScript error
      return { default: FallbackTestPage } as typeof import("remote/TestPage");
    })
);

// Pegamos o TestPage do remoteEventBus
const EventBusTestPage = lazy(() => 
  import("remoteEventBus/TestPage")
    .catch(() => {
      console.warn("Remote Event Bus TestPage failed to load. Using fallback component.");
      // Create a fallback component that shows event bus demo
      const EventBusFallback = () => (
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Event Bus Demo Not Available</h2>
            <p className="text-red-600">The remoteEventBus micro frontend is not running.</p>
            <p className="text-red-600 mt-2">
              To test the event bus communication, please start the remoteEventBus server on port 3002.
            </p>
          </div>
        </div>
      );
      return { default: EventBusFallback };
    })
);

// Desestruturamos os componentes do Layout para facilitar
const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const { selectedMenuItem } = useStoreSelector((state) => state.menu);

  // Verifica o menu selecionado e decide que conteúdo renderizar
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
      case "event-bus":
        return <EventBusTestPage />;
      default:
        return <TestPage />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* HEADER: pode conter o seu <Navbar /> com o combo de Providers */}
      <Header style={{ backgroundColor: "#fff", padding: "0 16px" }}>
        <Navbar />
      </Header>

      {/* CORPO: outro layout para dividir em Sider (menu) + Conteúdo */}
      <Layout>
        {/* SIDER: barra lateral com seu <SideMenu /> */}
        <Sider
          width={200}
          style={{
            backgroundColor: "#fff",
            borderRight: "1px solid #f0f0f0",
          }}
        >
          <SideMenu />
        </Sider>

        {/* CONTEÚDO + FOOTER */}
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content style={{ margin: "16px 0", minHeight: 280 }}>
            <div
              style={{
                backgroundColor: "#fff",
                padding: 24,
                borderRadius: 6,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <Suspense fallback={<div>Carregando...</div>}>
                {renderContent()}
              </Suspense>
            </div>
          </Content>

          <Footer style={{ textAlign: "center" }}>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

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
