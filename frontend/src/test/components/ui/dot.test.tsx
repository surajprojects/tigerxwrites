import Dot from "../../../components/ui/dot";
import { render, screen } from "@testing-library/react";

describe("Dot component", () => {
  // component render dot symbol
  test("render dot symbol", () => {
    render(<Dot />);
    expect(screen.getByRole("dot")).toBeInTheDocument();
  });
});
