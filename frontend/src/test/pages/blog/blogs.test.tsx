import { screen } from "@testing-library/react";
import { renderWithRouter } from "../../testUtils";

describe("Blogs page", () => {
  // renders blogs page
  test("renders blogs page", async () => {
    renderWithRouter("/blogs");
    expect(await screen.findByRole("blogswrapper")).toBeInTheDocument();
    expect(await screen.findByRole("blogsheader")).toBeInTheDocument();
    expect(await screen.findByRole("blogslist")).toBeInTheDocument();
    expect(await screen.findByRole("pagination")).toBeInTheDocument();
  });
});
