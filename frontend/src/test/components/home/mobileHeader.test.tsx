import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";
import MobileHeader from "../../../components/home/mobileHeader";

describe("MobileHeader component", () => {
  // component onClick function works
  test("onClick function works", async () => {
    const setShowMenuMock = vi.fn();
    render(
      <MemoryRouter>
        <MobileHeader setShowMenu={setShowMenuMock} />
      </MemoryRouter>,
    );
    const mobileHeader = screen.getByRole("mobileheader");
    expect(mobileHeader).toBeInTheDocument();
    await userEvent.click(mobileHeader);
    expect(setShowMenuMock).toHaveBeenCalled();
  });

  // component renders correctly
  test("renders correctly", () => {
    const setShowMenuMock = vi.fn();
    render(
      <MemoryRouter>
        <MobileHeader setShowMenu={setShowMenuMock} />
      </MemoryRouter>,
    );
    const mobileHeader = screen.getByRole("mobileheader");
    expect(within(mobileHeader).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(within(mobileHeader).getByRole("link", { name: "All Blogs" })).toHaveAttribute(
      "href",
      "/blogs",
    );
    expect(within(mobileHeader).getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(within(mobileHeader).getByRole("link", { name: "Sign In" })).toHaveAttribute(
      "href",
      "/signin",
    );
    expect(within(mobileHeader).getByRole("link", { name: "Write" })).toHaveAttribute(
      "href",
      "/blogs/new",
    );
  });
});
