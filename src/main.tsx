import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ScoresProvider } from "./services/scores/scores-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ScoresProvider>
      <App />
    </ScoresProvider>
  </StrictMode>,
);
