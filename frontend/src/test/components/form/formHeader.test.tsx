import FormHeader from "../../../components/form/formHeader";
import { render, screen, within } from "@testing-library/react";

describe("FormHeader component", () => {
  // component render with default values
  test("render with default values", () => {
    render(<FormHeader />);
    const formHeader = screen.getByRole("formheader");
    expect(formHeader).toBeInTheDocument();
    expect(within(formHeader).getByText("Welcome back")).toBeInTheDocument();
    expect(
      within(formHeader).getByText("Enter your credentials to access your account"),
    ).toBeInTheDocument();
  });

  // component render with provided values
  test("render with provided values", () => {
    render(<FormHeader title="Form Title" description="Form Description" />);
    const formHeader = screen.getByRole("formheader");
    expect(formHeader).toBeInTheDocument();
    expect(within(formHeader).getByText("Form Title")).toBeInTheDocument();
    expect(within(formHeader).getByText("Form Description")).toBeInTheDocument();
  });
});
