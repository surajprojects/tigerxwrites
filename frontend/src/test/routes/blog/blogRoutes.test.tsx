import { setupAxiosMock } from "../../mocks/axios";
import { rootRoute } from "../../../routes/rootRoute";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

beforeEach(() => {
  setupAxiosMock();
});

describe("Blog Routes", () => {
  // renders all blogs page on /blogs path
  test("renders all blogs page on /blogs path", async () => {
    const router = createMemoryRouter(rootRoute, {
      initialEntries: ["/blogs"],
    });
    render(<RouterProvider router={router} />);
    // RootLayout Component
    expect(await screen.findByRole("wrapper")).toBeInTheDocument();
    expect(await screen.findByRole("header")).toBeInTheDocument();
    expect(await screen.findByRole("maincontent")).toBeInTheDocument();
    expect(await screen.findByRole("footer")).toBeInTheDocument();
    // Blogs Component
    expect(await screen.findByRole("blogswrapper")).toBeInTheDocument();
    expect(await screen.findByRole("blogsheader")).toBeInTheDocument();
    expect(await screen.findByRole("blogslist")).toBeInTheDocument();
    expect(await screen.findByRole("pagination")).toBeInTheDocument();
  });

  // renders new blog page on /blogs/new path
  test("renders new blog page on /blogs/new path", async () => {
    const router = createMemoryRouter(rootRoute, {
      initialEntries: ["/blogs/new"],
    });
    render(<RouterProvider router={router} />);
    // RootLayout Component
    expect(await screen.findByRole("wrapper")).toBeInTheDocument();
    expect(await screen.findByRole("header")).toBeInTheDocument();
    expect(await screen.findByRole("maincontent")).toBeInTheDocument();
    expect(await screen.findByRole("footer")).toBeInTheDocument();
    // New Blog Component
    expect(await screen.findByRole("newblogwrapper")).toBeInTheDocument();
    expect(await screen.findByRole("backbtnwrapper")).toBeInTheDocument();
    expect(await screen.findByRole("blogformwrapper")).toBeInTheDocument();
    expect(await screen.findByRole("blogform")).toBeInTheDocument();
    expect(await screen.findByText("Create a New Story")).toBeInTheDocument();
    expect(await screen.findByText("Publish Story")).toBeInTheDocument();
  });

  // renders a blog page on /blogs/:blogId path
  test("renders a blog page on /blogs/1 path", async () => {
    const router = createMemoryRouter(rootRoute, {
      initialEntries: ["/blogs/1"],
    });
    render(<RouterProvider router={router} />);
    // RootLayout Component
    expect(await screen.findByRole("wrapper")).toBeInTheDocument();
    expect(await screen.findByRole("header")).toBeInTheDocument();
    expect(await screen.findByRole("maincontent")).toBeInTheDocument();
    expect(await screen.findByRole("footer")).toBeInTheDocument();
    // Blog Component
    expect(await screen.findByRole("blogwrapper")).toBeInTheDocument();
    expect(await screen.findByRole("backbtnwrapper")).toBeInTheDocument();
    expect(await screen.findByRole("showblog")).toBeInTheDocument();
  });

  // renders edit blog page on /blogs/:blogId/edit path
  test("renders edit blog page on /blogs/1/edit path", async () => {
    const router = createMemoryRouter(rootRoute, {
      initialEntries: ["/blogs/1/edit"],
    });
    render(<RouterProvider router={router} />);
    // RootLayout Component
    expect(await screen.findByRole("wrapper")).toBeInTheDocument();
    expect(await screen.findByRole("header")).toBeInTheDocument();
    expect(await screen.findByRole("maincontent")).toBeInTheDocument();
    expect(await screen.findByRole("footer")).toBeInTheDocument();
    // Edit Blog Component
    expect(await screen.findByRole("editblogwrapper")).toBeInTheDocument();
    expect(await screen.findByRole("backbtnwrapper")).toBeInTheDocument();
    expect(await screen.findByRole("blogformwrapper")).toBeInTheDocument();
    expect(await screen.findByRole("blogform")).toBeInTheDocument();
    expect(await screen.findByText("Edit Your Story")).toBeInTheDocument();
    expect(await screen.findByText("Update Story")).toBeInTheDocument();
  });
});
