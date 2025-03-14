import React, { Suspense } from "react";
import * as ReactDOMClient from "react-dom/client";

import "./index.css";
import StoreProvider from "./providers/StoreProvider";
const TestPage = React.lazy(() => import("remote/TestPage"));

const App = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 text-3xl text-red-600">
      <div>Name: container</div>
      <div>Framework: React</div>
      <div>Language: TypeScript</div>
      <div>CSS: Tailwind</div>
      <Suspense fallback={<div>Loading...</div>}>
        <TestPage />
      </Suspense>
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
