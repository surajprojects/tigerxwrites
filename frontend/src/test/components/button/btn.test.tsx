import Btn from "../../../components/button/btn";
import { render, screen } from "@testing-library/react";

describe("Btn component", () => {
  // component render with default text
  test("render default text", () => {
    render(<Btn />);
    const button = screen.getByRole("button", { name: "Click here!" });
    expect(button).toBeInTheDocument();
  });

  // component render with provided text
  test("render with provided text", () => {
    render(<Btn text="Submit" />);
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeInTheDocument();
  });

  // component button type works
  test("button type works", () => {
    render(<Btn btnType="submit" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  // component disabled when true
  test("disabled when true", () => {
    render(<Btn btnDisabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  // component disabled when loading is true
  test("disabled when loading is true", () => {
    render(<Btn isLoading={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  // component text not shown when loading is true
  test("text not shown when loading is true", () => {
    render(<Btn isLoading={true} text="Submit Text" />);
    const button = screen.queryByText("Submit Text");
    expect(button).not.toBeInTheDocument();
  });
});
