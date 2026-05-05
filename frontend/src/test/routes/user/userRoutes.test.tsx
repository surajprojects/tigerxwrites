import { screen } from "@testing-library/react";
import { setupAxiosMock } from "../../mocks/axios";
import { renderWithRouter } from "../../testUtils";

beforeEach(() => {
  setupAxiosMock();
});

describe("User Routes", () => {
  // renders signin page on /signin path
  test("renders signin page on /signin path", async () => {
    renderWithRouter("/signin");
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
    renderWithRouter("/signup");
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
