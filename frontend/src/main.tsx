import "./index.css";
import { StrictMode } from "react";
import { rootRoute } from "./routes/rootRoute";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Initialize React Router with routes
const router = createBrowserRouter(rootRoute);

// Mount React app to the root element
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
