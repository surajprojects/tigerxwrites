import { MemoryRouter } from "react-router-dom";
import FormAction from "../../../components/form/formAction";
import { render, screen, within } from "@testing-library/react";

describe("FormAction component", () => {
  // component render with default values
  test("render with default values", () => {
    render(
      <MemoryRouter>
        <FormAction />
      </MemoryRouter>,
    );
    const formAction = screen.getByRole("formaction");
    expect(formAction).toBeInTheDocument();
    expect(formAction).toHaveTextContent("Don't have an account?Sign up");
    expect(
      within(formAction).getByRole("link", {
        name: "Sign up",
      }),
    ).toHaveAttribute("href", "/");
  });

  // component render with provided values
  test("render with provided values", () => {
    render(
      <MemoryRouter>
        <FormAction linkName="Register Now" linkTo="/register" text="New to the platform?" />
      </MemoryRouter>,
    );
    const formAction = screen.getByRole("formaction");
    expect(formAction).toBeInTheDocument();
    expect(formAction).toHaveTextContent("New to the platform?Register Now");
    expect(
      within(formAction).getByRole("link", {
        name: "Register Now",
      }),
    ).toHaveAttribute("href", "/register");
  });
});
