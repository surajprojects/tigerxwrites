/* eslint-disable @typescript-eslint/no-explicit-any */

import { vi } from "vitest";
import App from "../../../components/home/app";
import { render, screen } from "@testing-library/react";
import { useNewBlogStream } from "../../../hooks/newBlogStream";

vi.mock("../../../hooks/newBlogStream", () => ({
  useNewBlogStream: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    RouterProvider: () => <div>Router Loaded</div>,
  };
});

describe("App component", () => {
  // component renders with context
  test("renders with context", () => {
    (useNewBlogStream as any).mockReturnValue({
      blogsData: [],
      isLoading: false,
    });
    render(<App />);
    expect(screen.getByText("Router Loaded")).toBeInTheDocument();
  });
});
