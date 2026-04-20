import { render } from "@testing-library/react";
import { rootRoute } from "../routes/rootRoute";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

export function renderWithRouter(initialPath: string) {
  const router = createMemoryRouter(rootRoute, {
    initialEntries: [initialPath],
  });
  return render(<RouterProvider router={router} />);
}
