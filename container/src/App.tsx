import React, { Suspense } from "react";
import * as ReactDOMClient from "react-dom/client";

import "./index.css";
import StoreProvider from "./providers/StoreProvider";
import Navbar from "./components/Navbar";
const TestPage = React.lazy(() => import("remote/TestPage"));

const App = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <TestPage />
      </Suspense>
    </>
  );
};

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container!);

root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
