import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Header from "../../../components/home/header";
import { render, screen, waitFor, within } from "@testing-library/react";

vi.mock("../../../components/home/mobileHeader", () => ({
  default: () => <p role="mobileheader">Mobile Header</p>,
}));

vi.mock("../../../components/button/newBlogStreamBtn", () => ({
  default: () => <p role="newblogstreambtn">New Blog Stream Btn</p>,
}));

describe("Header component", () => {
  // component renders correctly
  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const header = screen.getByRole("header");
    expect(within(header).getByRole("link", { name: "Tiger Writes" })).toHaveAttribute("href", "/");
    expect(within(header).getByRole("mobileheaderbtn")).toBeInTheDocument();
    // Nav Links
    expect(within(header).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(within(header).getByRole("link", { name: "All Blogs" })).toHaveAttribute(
      "href",
      "/blogs",
    );
    expect(within(header).getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(within(header).getByRole("newblogstreambtn")).toBeInTheDocument();
    // CTA
    expect(within(header).getByRole("link", { name: "Sign In" })).toHaveAttribute(
      "href",
      "/signin",
    );
    expect(within(header).getByRole("link", { name: "Write" })).toHaveAttribute(
      "href",
      "/blogs/new",
    );
  });

  // component renders mobile header correctly
  test("renders mobile header correctly", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const header = screen.getByRole("header");
    const mobileHeaderBtn = within(header).getByRole("mobileheaderbtn");
    expect(within(header).queryByRole("mobileheader")).not.toBeInTheDocument();
    await userEvent.click(mobileHeaderBtn);
    await waitFor(() => {
      expect(within(header).getByRole("mobileheader")).toBeInTheDocument();
    });
  });
});
