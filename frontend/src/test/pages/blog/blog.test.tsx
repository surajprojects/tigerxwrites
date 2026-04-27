import Blog from "../../../pages/blog/Blog";
import { render, screen } from "@testing-library/react";

describe("Blog page", () => {
  // renders blog page
  test("renders blog page", () => {
    render(<Blog />);
    expect(screen.getByRole("blogwrapper")).toBeInTheDocument();
    expect(screen.getByRole("backbtnwrapper")).toBeInTheDocument();
    expect(screen.getByRole("showblog")).toBeInTheDocument();
  });
});
