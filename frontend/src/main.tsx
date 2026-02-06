import { StrictMode } from "react";
import App from "./components/home/app";
import { createRoot } from "react-dom/client";

// Mount React app to the root element
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />,
  </StrictMode>,
);
