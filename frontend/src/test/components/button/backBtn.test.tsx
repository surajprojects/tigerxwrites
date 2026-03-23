import { render, screen } from "@testing-library/react";
import BackBtn from "../../../components/button/backBtn";

describe("BackBtn component", () => {
  // component render with default text
  test("renders default text", () => {
    render(<BackBtn />);
    const button = screen.getByRole("button", { name: "Click here!" });
    expect(button).toBeInTheDocument();
  });
});
