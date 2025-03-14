import React, { Suspense, lazy } from "react";
import * as ReactDOMClient from "react-dom/client";
import { Layout } from "antd";            // <--- IMPORTAMOS O LAYOUT DO ANTD
import "./index.css";

import StoreProvider from "./providers/StoreProvider";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";
import { useStoreSelector } from "./hooks/useStoreSelector";
import FallbackTestPage from "./components/FallbackTestPage";

// Pegamos o TestPage remotamente com tratamento de erro
const TestPage = lazy(() => 
  import("remote/TestPage")
    .catch(() => {
      console.warn("Remote TestPage failed to load. Using fallback component.");
      // Use type assertion to resolve TypeScript error
      return { default: FallbackTestPage } as typeof import("remote/TestPage");
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

// Renderiza a aplicação
const container = document.getElementById("app")!;
const root = ReactDOMClient.createRoot(container);

root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
