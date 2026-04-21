import userEvent from "@testing-library/user-event";
import BlogCard from "../../../components/blog/blogCard";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";

describe("BlogCard component", () => {
  // component render with default values
  test("render with default values", () => {
    render(<BlogCard />);
    const blogCard = screen.getByRole("blogcard");
    expect(blogCard).toBeInTheDocument();
    expect(
      within(blogCard).getByText("The Art of Storytelling in the Digital Age"),
    ).toBeInTheDocument();
    expect(
      within(blogCard).getByText(
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates consequuntur quae, perferendis error.",
      ),
    ).toBeInTheDocument();
    expect(within(blogCard).getByText("Sarah Chen")).toBeInTheDocument();
    expect(within(blogCard).getByText("Oct 08, 2025")).toBeInTheDocument();
    expect(within(blogCard).getByText("1 min read")).toBeInTheDocument();
  });

  // component render with provided values
  test("render with provided values", () => {
    render(
      <BlogCard
        title="Blog Title"
        excerpt="Blog Description"
        createdAt="2026-05-03"
        author={{
          name: "Tiger",
        }}
        content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, nostrum cupiditate architecto doloremque ducimus earum. Eligendi, impedit ipsam nemo, aliquam excepturi tempora velit alias ad voluptatum eveniet nulla, provident fugiat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, nostrum cupiditate architecto doloremque ducimus earum. Eligendi, impedit ipsam nemo, aliquam excepturi tempora velit alias ad voluptatum eveniet nulla, provident fugiat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, nostrum cupiditate architecto doloremque ducimus earum. Eligendi, impedit ipsam nemo, aliquam excepturi tempora velit alias ad voluptatum eveniet nulla, provident fugiat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, nostrum cupiditate architecto doloremque ducimus earum. Eligendi, impedit ipsam nemo, aliquam excepturi tempora velit alias ad voluptatum eveniet nulla, provident fugiat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, nostrum cupiditate architecto doloremque ducimus earum. Eligendi, impedit ipsam nemo, aliquam excepturi tempora velit alias ad voluptatum eveniet nulla, provident fugiat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, nostrum cupiditate architecto doloremque ducimus earum. Eligendi, impedit ipsam nemo, aliquam excepturi tempora velit alias ad voluptatum eveniet nulla, provident fugiat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, nostrum cupiditate architecto doloremque ducimus earum. Eligendi, impedit ipsam nemo, aliquam excepturi tempora velit alias ad voluptatum eveniet nulla, provident fugiat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, nostrum cupiditate architecto doloremque ducimus earum. Eligendi, impedit ipsam nemo, aliquam excepturi tempora velit alias ad voluptatum eveniet nulla, provident fugiat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, nostrum cupiditate architecto doloremque ducimus earum. Eligendi, impedit ipsam nemo, aliquam excepturi tempora velit alias ad voluptatum eveniet nulla, provident fugiat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, nostrum cupiditate architecto doloremque ducimus earum. Eligendi, impedit ipsam nemo, aliquam excepturi tempora velit alias ad voluptatum eveniet nulla, provident fugiat."
      />,
    );
    const blogCard = screen.getByRole("blogcard");
    expect(blogCard).toBeInTheDocument();
    expect(within(blogCard).getByText("Blog Title")).toBeInTheDocument();
    expect(within(blogCard).getByText("Blog Description")).toBeInTheDocument();
    expect(within(blogCard).getByText("Tiger")).toBeInTheDocument();
    expect(within(blogCard).getByText("May 03, 2026")).toBeInTheDocument();
    expect(within(blogCard).getByText("2 mins read")).toBeInTheDocument();
  });

  // component render without buttons when showBtns is false (default)
  test("render without buttons when showBtns is false (default)", () => {
    render(
      <MemoryRouter>
        <BlogCard />
      </MemoryRouter>,
    );
    const blogCard = screen.getByRole("blogcard");
    const showBtns = within(blogCard).queryByRole("showbtns");
    expect(showBtns).not.toBeInTheDocument();
  });

  // component render with buttons when showBtns is true
  test("render with buttons when showBtns is true", () => {
    render(
      <MemoryRouter>
        <BlogCard showBtns={true} />
      </MemoryRouter>,
    );
    const blogCard = screen.getByRole("blogcard");
    const showBtns = within(blogCard).getByRole("showbtns");
    expect(showBtns).toBeInTheDocument();
    expect(within(showBtns).getByText("Edit")).toBeInTheDocument();
    expect(within(showBtns).getByText("Delete")).toBeInTheDocument();
  });

  // component onClick function works
  test("onClick function works", async () => {
    const navigate = useNavigate();
    render(
      <MemoryRouter>
        <BlogCard showBtns={true} />
      </MemoryRouter>,
    );
    const showBlogData = screen.getByRole("showblogdata");
    await userEvent.click(showBlogData);
    expect(navigate).toHaveBeenCalledWith("/blogs/#");
  });
});
