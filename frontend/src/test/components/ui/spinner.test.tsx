import Spinner from "../../../components/ui/spinner";
import { render, screen } from "@testing-library/react";

describe("Spinner component", () => {
  // component render spinner with wrapper (default)
  test("render spinner with wrapper (default)", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByRole("spinner")).toBeInTheDocument();
  });

  // component render spinner without wrapper
  test("render spinner without wrapper", () => {
    render(<Spinner customize={true} />);
    expect(screen.getByRole("spinner")).toBeInTheDocument();
  });
});
