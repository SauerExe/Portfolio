import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/base.css";
import "./styles/v3.css";

// Im Build ist jede Route vorgerendert (scripts/generate-seo.mjs) und wird
// nur hydriert; im Dev-Server ist #root leer und wird normal gerendert.
const root = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
