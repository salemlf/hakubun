import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// for mock service worker
async function enableMocking() {
  if (import.meta.env.MODE !== "development") {
    return;
  }
  const { worker } = await import("./testing/worker");
  worker.start();
}

const container = document.getElementById("root");
enableMocking().then(() => {
  const root = createRoot(container!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
