import { setupAxiosMock } from "../../mocks/axios";
import { rootRoute } from "../../../routes/rootRoute";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

beforeEach(() => {
  setupAxiosMock();
});

describe("User Routes", () => {
  // renders signin page on /signin path
  test("renders signin page on /signin path", async () => {
    const router = createMemoryRouter(rootRoute, {
      initialEntries: ["/signin"],
    });
    render(<RouterProvider router={router} />);
    // RootLayout Component
    expect(await screen.findByRole("wrapper")).toBeInTheDocument();
    expect(await screen.findByRole("header")).toBeInTheDocument();
    expect(await screen.findByRole("maincontent")).toBeInTheDocument();
    expect(await screen.findByRole("footer")).toBeInTheDocument();
    // SignIn Component
    expect(await screen.findByRole("signinwrapper")).toBeInTheDocument();
    expect(await screen.findByRole("signinformwrapper")).toBeInTheDocument();
    expect(await screen.findByText("Welcome back")).toBeInTheDocument();
    expect(
      await screen.findByText("Enter your credentials to access your account"),
    ).toBeInTheDocument();
  });

  // renders signup page on /signin path
  test("renders signup page on /signup path", async () => {
    const router = createMemoryRouter(rootRoute, {
      initialEntries: ["/signup"],
    });
    render(<RouterProvider router={router} />);
    // RootLayout Component
    expect(await screen.findByRole("wrapper")).toBeInTheDocument();
    expect(await screen.findByRole("header")).toBeInTheDocument();
    expect(await screen.findByRole("maincontent")).toBeInTheDocument();
    expect(await screen.findByRole("footer")).toBeInTheDocument();
    // SignIn Component
    expect(await screen.findByRole("signupwrapper")).toBeInTheDocument();
    expect(await screen.findByRole("signupformwrapper")).toBeInTheDocument();
    expect(await screen.findByText("Create an account")).toBeInTheDocument();
    expect(
      await screen.findByText("Join Tiger Writes and start sharing your stories"),
    ).toBeInTheDocument();
  });
});
