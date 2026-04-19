import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SignInForm from "../../../components/user/SignInForm";
import type { SignInInput } from "@tigerxinsights/tigerxwrites";
import { render, screen, waitFor, within } from "@testing-library/react";

describe("SignInForm component", () => {
  // component renders correctly
  test("renders correctly", () => {
    const handleSubmit = async (_data: SignInInput): Promise<boolean> => true;
    render(
      <MemoryRouter>
        <SignInForm handleSubmit={handleSubmit} />
      </MemoryRouter>,
    );
    const signInFormWrapper = screen.getByRole("signinformwrapper");
    // Form Header
    const formHeader = within(signInFormWrapper).getByRole("formheader");
    expect(within(formHeader).queryByText("Welcome back")).toBeInTheDocument();
    expect(
      within(formHeader).queryByText("Enter your credentials to access your account"),
    ).toBeInTheDocument();
    // Sign In Form
    const signInForm = screen.getByRole("signinform");
    // Email
    const emailInput = within(signInForm).getByLabelText("Email");
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("id", "email");
    expect(emailInput).toHaveAttribute("name", "email");
    expect(emailInput).toHaveAttribute("value", "");
    expect(emailInput).toHaveAttribute("placeholder", "your@email.com");
    expect(emailInput).toBeRequired();
    // Password
    const passwordInput = within(signInForm).getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute("id", "password");
    expect(passwordInput).toHaveAttribute("name", "password");
    expect(passwordInput).toHaveAttribute("value", "");
    expect(passwordInput).toHaveAttribute("placeholder", "••••••••");
    expect(passwordInput).toBeRequired();
    // Show Password Button
    expect(within(signInForm).getByRole("showpasswordbtn")).toBeInTheDocument();
    // Sign In Button
    expect(within(signInForm).getByRole("button", { name: "Sign In" })).toHaveAttribute(
      "type",
      "submit",
    );
    // Form Action
    const formAction = within(signInForm).getByRole("formaction");
    expect(within(formAction).queryByText("Don't have an account?")).toBeInTheDocument();
    expect(
      within(formAction).getByRole("link", {
        name: "Sign up",
      }),
    ).toHaveAttribute("href", "/signup");
  });

  // component input works correctly
  test("input works correctly", async () => {
    const handleSubmit = async (_data: SignInInput): Promise<boolean> => true;
    render(
      <MemoryRouter>
        <SignInForm handleSubmit={handleSubmit} />
      </MemoryRouter>,
    );
    const signInForm = screen.getByRole("signinform");
    // Email
    const emailInput = within(signInForm).getByLabelText("Email");
    expect(emailInput).toHaveValue("");
    // Input Text
    await userEvent.type(emailInput, "Email Input");
    expect(emailInput).toHaveValue("Email Input");
    // Clear Text
    await userEvent.clear(emailInput);
    expect(emailInput).toHaveValue("");

    // Password
    const passwordInput = within(signInForm).getByLabelText("Password");
    expect(passwordInput).toHaveValue("");
    // Input Text
    await userEvent.type(passwordInput, "Password Input");
    expect(passwordInput).toHaveValue("Password Input");
    // Clear Text
    await userEvent.clear(passwordInput);
    expect(passwordInput).toHaveValue("");
  });

  // component submit function works
  test("submit function works", async () => {
    const handleSubmit = async (_data: SignInInput): Promise<boolean> => true;
    render(
      <MemoryRouter>
        <SignInForm handleSubmit={handleSubmit} />
      </MemoryRouter>,
    );
    const signInForm = screen.getByRole("signinform");
    expect(signInForm).toBeInTheDocument();
    const button = within(signInForm).getByRole("button", { name: "Sign In" });
    await userEvent.click(button);
    waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  // component render spinner on submit
  test("render spinner on submit", async () => {
    const handleSubmit = async (_data: SignInInput): Promise<boolean> => true;
    render(
      <MemoryRouter>
        <SignInForm handleSubmit={handleSubmit} />
      </MemoryRouter>,
    );
    const signInForm = screen.getByRole("signinform");
    expect(signInForm).toBeInTheDocument();
    const button = within(signInForm).getByRole("button", { name: "Sign In" });
    expect(within(button).queryByRole("spinner")).not.toBeInTheDocument();
    await userEvent.click(button);
    waitFor(() => {
      expect(screen.getByRole("spinner")).toBeInTheDocument();
    });
    expect(within(button).queryByRole("spinner")).not.toBeInTheDocument();
  });

  // component render disabled button on submit
  test("render disabled button on submit", async () => {
    const handleSubmit = async (_data: SignInInput): Promise<boolean> => true;
    render(
      <MemoryRouter>
        <SignInForm handleSubmit={handleSubmit} />
      </MemoryRouter>,
    );
    const signInForm = screen.getByRole("signinform");
    expect(signInForm).toBeInTheDocument();
    const button = within(signInForm).getByRole("button", { name: "Sign In" });
    expect(button).not.toBeDisabled();
    await userEvent.click(button);
    waitFor(() => {
      expect(button).toBeDisabled();
    });
    expect(button).not.toBeDisabled();
  });
});
