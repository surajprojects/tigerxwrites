import PageNotFound from "../../pages/PageNotFound";
import { render, screen } from "@testing-library/react";

describe("PageNotFound page", () => {
  // renders page not found page
  test("renders page not found page", () => {
    render(<PageNotFound />);
    expect(screen.getByRole("pagenotfound")).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
