import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@src/app/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
