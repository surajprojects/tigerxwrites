import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SignUpForm from "../../../components/user/SignUpForm";
import type { SignUpInput } from "@tigerxinsights/tigerxwrites";
import { render, screen, waitFor, within } from "@testing-library/react";

vi.mock("react-turnstile", () => ({
  default: () => <p role="turnstile">turnstile</p>,
}));

describe("SignUpForm component", () => {
  // component renders correctly
  test("renders correctly", () => {
    const handleSubmit = async (
      _data: SignUpInput,
      _captchaToken: string | undefined,
    ): Promise<boolean> => true;
    render(
      <MemoryRouter>
        <SignUpForm handleSubmit={handleSubmit} />
      </MemoryRouter>,
    );
    const signUpFormWrapper = screen.getByRole("signupformwrapper");
    // Form Header
    const formHeader = within(signUpFormWrapper).getByRole("formheader");
    expect(within(formHeader).queryByText("Create an account")).toBeInTheDocument();
    expect(
      within(formHeader).queryByText("Join Tiger Writes and start sharing your stories"),
    ).toBeInTheDocument();
    // Sign Up Form
    const signUpForm = screen.getByRole("signupform");
    // Name
    const nameInput = within(signUpForm).getByLabelText("Full Name");
    expect(nameInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveAttribute("id", "name");
    expect(nameInput).toHaveAttribute("name", "name");
    expect(nameInput).toHaveAttribute("value", "");
    expect(nameInput).toHaveAttribute("placeholder", "John Doe");
    expect(nameInput).toBeRequired();
    // Email
    const emailInput = within(signUpForm).getByLabelText("Email");
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("id", "email");
    expect(emailInput).toHaveAttribute("name", "email");
    expect(emailInput).toHaveAttribute("value", "");
    expect(emailInput).toHaveAttribute("placeholder", "your@email.com");
    expect(emailInput).toBeRequired();
    // Password
    const passwordInput = within(signUpForm).getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute("id", "password");
    expect(passwordInput).toHaveAttribute("name", "password");
    expect(passwordInput).toHaveAttribute("value", "");
    expect(passwordInput).toHaveAttribute("placeholder", "••••••••");
    expect(passwordInput).toBeRequired();
    // Show Password Button
    expect(within(signUpForm).getByRole("showpasswordbtn")).toBeInTheDocument();
    // Confirm Password
    const confirmPasswordInput = within(signUpForm).getByLabelText("Confirm Password");
    expect(confirmPasswordInput).toHaveAttribute("type", "password");
    expect(confirmPasswordInput).toHaveAttribute("id", "confirmPassword");
    expect(confirmPasswordInput).toHaveAttribute("name", "confirmPassword");
    expect(confirmPasswordInput).toHaveAttribute("value", "");
    expect(confirmPasswordInput).toHaveAttribute("placeholder", "••••••••");
    expect(confirmPasswordInput).toBeRequired();
    // Show Confirm Password Button
    expect(within(signUpForm).getByRole("showconfirmpasswordbtn")).toBeInTheDocument();
    // Cloudflare Captcha
    expect(within(signUpForm).getByRole("turnstile")).toBeInTheDocument();
    // Sign Up Button
    expect(within(signUpForm).getByRole("button", { name: "Create Account" })).toHaveAttribute(
      "type",
      "submit",
    );
    // Form Action
    const formAction = within(signUpForm).getByRole("formaction");
    expect(within(formAction).queryByText("Already have an account?")).toBeInTheDocument();
    expect(
      within(formAction).getByRole("link", {
        name: "Sign in",
      }),
    ).toHaveAttribute("href", "/signin");
  });

  // component input works correctly
  test("input works correctly", async () => {
    const handleSubmit = async (
      _data: SignUpInput,
      _captchaToken: string | undefined,
    ): Promise<boolean> => true;
    render(
      <MemoryRouter>
        <SignUpForm handleSubmit={handleSubmit} />
      </MemoryRouter>,
    );
    const signUpForm = screen.getByRole("signupform");
    // Name
    const nameInput = within(signUpForm).getByLabelText("Full Name");
    expect(nameInput).toHaveValue("");
    // Input Text
    await userEvent.type(nameInput, "Name Input");
    expect(nameInput).toHaveValue("Name Input");
    // Clear Text
    await userEvent.clear(nameInput);
    expect(nameInput).toHaveValue("");

    // Email
    const emailInput = within(signUpForm).getByLabelText("Email");
    expect(emailInput).toHaveValue("");
    // Input Text
    await userEvent.type(emailInput, "Email Input");
    expect(emailInput).toHaveValue("Email Input");
    // Clear Text
    await userEvent.clear(emailInput);
    expect(emailInput).toHaveValue("");

    // Password
    const passwordInput = within(signUpForm).getByLabelText("Password");
    expect(passwordInput).toHaveValue("");
    // Input Text
    await userEvent.type(passwordInput, "Password Input");
    expect(passwordInput).toHaveValue("Password Input");
    // Clear Text
    await userEvent.clear(passwordInput);
    expect(passwordInput).toHaveValue("");

    // Confirm Password
    const confirmPasswordInput = within(signUpForm).getByLabelText("Confirm Password");
    expect(confirmPasswordInput).toHaveValue("");
    // Input Text
    await userEvent.type(confirmPasswordInput, "Confirm Password Input");
    expect(confirmPasswordInput).toHaveValue("Confirm Password Input");
    // Clear Text
    await userEvent.clear(confirmPasswordInput);
    expect(confirmPasswordInput).toHaveValue("");
  });

  // component submit function works
  test("submit function works", async () => {
    const handleSubmit = async (
      _data: SignUpInput,
      _captchaToken: string | undefined,
    ): Promise<boolean> => true;
    render(
      <MemoryRouter>
        <SignUpForm handleSubmit={handleSubmit} />
      </MemoryRouter>,
    );
    const signUpForm = screen.getByRole("signupform");
    expect(signUpForm).toBeInTheDocument();
    const button = within(signUpForm).getByRole("button", { name: "Create Account" });
    await userEvent.click(button);
    waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  // component render spinner on submit
  test("render spinner on submit", async () => {
    const handleSubmit = async (
      _data: SignUpInput,
      _captchaToken: string | undefined,
    ): Promise<boolean> => true;
    render(
      <MemoryRouter>
        <SignUpForm handleSubmit={handleSubmit} />
      </MemoryRouter>,
    );
    const signUpForm = screen.getByRole("signupform");
    expect(signUpForm).toBeInTheDocument();
    const button = within(signUpForm).getByRole("button", { name: "Create Account" });
    expect(within(button).queryByRole("spinner")).not.toBeInTheDocument();
    await userEvent.click(button);
    waitFor(() => {
      expect(screen.getByRole("spinner")).toBeInTheDocument();
    });
    expect(within(button).queryByRole("spinner")).not.toBeInTheDocument();
  });

  // component render disabled button on submit
  test("render disabled button on submit", async () => {
    const handleSubmit = async (
      _data: SignUpInput,
      _captchaToken: string | undefined,
    ): Promise<boolean> => true;
    render(
      <MemoryRouter>
        <SignUpForm handleSubmit={handleSubmit} />
      </MemoryRouter>,
    );
    const signUpForm = screen.getByRole("signupform");
    expect(signUpForm).toBeInTheDocument();
    const button = within(signUpForm).getByRole("button", { name: "Create Account" });
    expect(button).not.toBeDisabled();
    await userEvent.click(button);
    waitFor(() => {
      expect(button).toBeDisabled();
    });
    expect(button).not.toBeDisabled();
  });
});
