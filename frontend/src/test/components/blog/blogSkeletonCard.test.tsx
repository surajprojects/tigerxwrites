import { render, screen, within } from "@testing-library/react";
import BlogSkeletonCard from "../../../components/blog/blogSkeletonCard";

describe("BlogSkeletonCard component", () => {
  // component render correctly
  test("render correctly", () => {
    render(<BlogSkeletonCard />);
    const blogSkeletonCard = screen.getByRole("blogskeletoncard");
    expect(blogSkeletonCard).toBeInTheDocument();
    expect(within(blogSkeletonCard).getByRole("titleandexcerpt")).toBeInTheDocument();
    expect(within(blogSkeletonCard).getByRole("authorandpostedon")).toBeInTheDocument();
  });
});
