import { MemoryRouter } from "react-router-dom";
import Footer from "../../../components/home/footer";
import { render, screen, within } from "@testing-library/react";

describe("Footer component", () => {
  // component render correctly
  test("render correctly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const footer = screen.getByRole("footer");
    expect(within(footer).getByText("Tiger Writes")).toBeInTheDocument();
    expect(
      within(footer).getByText(
        "A platform for writers to share their stories, insights, and perspectives with a global audience.",
      ),
    ).toBeInTheDocument();
    // Explore
    expect(within(footer).getByText("Explore")).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: "Featured" })).toHaveAttribute(
      "href",
      "/#featured",
    );
    expect(within(footer).getByRole("link", { name: "All Blogs" })).toHaveAttribute(
      "href",
      "/blogs",
    );
    expect(within(footer).getByRole("link", { name: "Writers" })).toHaveAttribute("href", "/");
    expect(within(footer).getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    // Connect
    expect(within(footer).getByText("Connect")).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: "Twitter" })).toHaveAttribute("href", "/");
    expect(within(footer).getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "/");
    expect(within(footer).getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "/");
    expect(within(footer).getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "https://tigerxinsights.vercel.app/#contact",
    );
    // Coypright
    expect(within(footer).getByRole("copyright")).toBeInTheDocument();
    expect(within(footer).getByText("Your insights, our priority")).toBeInTheDocument();
  });
});
