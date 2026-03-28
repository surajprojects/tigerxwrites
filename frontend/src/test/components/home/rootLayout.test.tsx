import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RootLayout from "../../../components/home/rootLayout";

vi.mock("../../../components/home/header", () => ({
  default: () => <div>Header</div>,
}));

vi.mock("../../../components/home/footer", () => ({
  default: () => <div>Footer</div>,
}));

vi.mock("../../../components/home/authProvider", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("../../../components/ui/scrollToTop", () => ({
  default: () => <div>Scroll</div>,
}));

vi.mock("react-toastify", () => ({
  ToastContainer: () => <div>Toast</div>,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div>Outlet Content</div>,
    RouterProvider: () => <div>Router Loaded</div>,
  };
});

describe("RootLayout component", () => {
  // component renders layout structure
  test("renders layout structure", () => {
    render(<RootLayout />);
    expect(screen.getByText("Scroll")).toBeInTheDocument();
    expect(screen.getByRole("wrapper")).toBeInTheDocument();
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Outlet Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
    expect(screen.getByText("Toast")).toBeInTheDocument();
  });
});
