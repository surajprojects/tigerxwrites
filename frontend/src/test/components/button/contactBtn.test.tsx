import { render, screen } from "@testing-library/react";
import ContactBtn from "../../../components/button/contactBtn";

describe("ContactBtn Component", () => {
  // component render with default text
  test("render default text", () => {
    render(<ContactBtn />);
    const link = screen.getByRole("link", {
      name: "Get in Touch",
    });
    expect(link).toBeInTheDocument();
  });

  // component render with provided text
  test("render provided text", () => {
    render(<ContactBtn text="Contact Us" />);
    const link = screen.getByRole("link", {
      name: "Contact Us",
    });
    expect(link).toBeInTheDocument();
  });

  // component render with default href
  test("render with default href", () => {
    render(<ContactBtn />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#");
  });

  // component render with provided href
  test("render with provided href", () => {
    render(<ContactBtn hrefLink="/contactus" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/contactus");
  });

  // component render when newTab prop is true
  test("render when newTab prop is true", () => {
    render(<ContactBtn newTab={true} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
  });

  // component render when newTab prop is false (default)
  test("render when newTab prop is false (default)", () => {
    render(<ContactBtn newTab={false} />);
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("target", "_blank");
  });
});
