import { screen } from "@testing-library/react";
import { renderWithRouter } from "../../testUtils";

describe("Blog page", () => {
  // renders blog page
  test("renders blog page", async () => {
    renderWithRouter("/blogs/1");
    expect(await screen.findByRole("blogwrapper")).toBeInTheDocument();
    expect(await screen.findByRole("backbtnwrapper")).toBeInTheDocument();
    expect(await screen.findByRole("showblog")).toBeInTheDocument();
  });
});
