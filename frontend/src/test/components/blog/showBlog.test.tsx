import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ShowBlog from "../../../components/blog/showBlog";

vi.mock("../../../components/ui/nameDate", () => ({
  default: ({ date }: { date: string }) => <p>{date}</p>,
}));

describe("ShowBlog component", () => {
  // component render with default values
  test("render with default values", () => {
    render(<ShowBlog />);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Excerpt")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("2025-10-08")).toBeInTheDocument();
    expect(screen.getAllByText("Author Name")).toHaveLength(1);
    expect(screen.getByText("Author Bio")).toBeInTheDocument();
  });

  // component render with provided values
  test("render with provided values", () => {
    render(
      <ShowBlog
        title="My Blog"
        excerpt="Short Text"
        content="Full Text"
        createdAt="2026-05-03"
        author={{
          name: "Tiger",
          bio: "Blogs",
        }}
      />,
    );
    expect(screen.getByText("My Blog")).toBeInTheDocument();
    expect(screen.getByText("Short Text")).toBeInTheDocument();
    expect(screen.getByText("Full Text")).toBeInTheDocument();
    expect(screen.getByText("2026-05-03")).toBeInTheDocument();
    expect(screen.getAllByText("Tiger")).toHaveLength(1);
    expect(screen.getByText("Blogs")).toBeInTheDocument();
  });

  // component render author bio with default value when null
  test("render author bio with default value when null", () => {
    render(
      <ShowBlog
        author={{
          bio: null,
        }}
      />,
    );
    expect(screen.getByText("Placeholder bio...")).toBeInTheDocument();
  });
});
