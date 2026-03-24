import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import EditBlogBtn from "../../../components/button/editBlogBtn";

describe("EditBlogBtn component", () => {
  // component render with default text
  test("render default text", () => {
    render(
      <MemoryRouter>
        <EditBlogBtn />
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", {
      name: "Edit",
    });
    expect(link).toBeInTheDocument();
  });

  // component render with default href
  test("render with default href", () => {
    render(
      <MemoryRouter>
        <EditBlogBtn />
      </MemoryRouter>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });

  // component render with provided href
  test("render with provided href", () => {
    render(
      <MemoryRouter>
        <EditBlogBtn linkTo="/backhome" />
      </MemoryRouter>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/backhome");
  });
});
