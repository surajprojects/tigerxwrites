import userEvent from "@testing-library/user-event";
import BlogForm from "../../../components/blog/blogForm";
import { render, screen, waitFor, within } from "@testing-library/react";
import type { CreateBlogInput, UpdateBlogInput } from "@tigerxinsights/tigerxwrites";

describe("BlogForm component", () => {
  // component render with default values
  test("render with default values", () => {
    render(<BlogForm />);
    const blogForm = screen.getByRole("blogform");
    // Title
    expect(within(blogForm).getByText("Create a New Story")).toBeInTheDocument();
    // Button
    expect(within(blogForm).getByRole("button", { name: "Publish Story" })).toBeInTheDocument();
    expect(within(blogForm).getByRole("button", { name: "Publish Story" })).toHaveAttribute(
      "type",
      "submit",
    );
    // Title
    const titleInput = within(blogForm).getByLabelText("Title");
    expect(titleInput).toHaveAttribute("id", "title");
    expect(titleInput).toHaveAttribute("name", "title");
    expect(titleInput).toHaveValue("");
    expect(titleInput).toBeRequired();
    expect(titleInput).toHaveAttribute("placeholder", "Enter your story title...");
    // Excerpt
    const excerptInput = within(blogForm).getByLabelText("Excerpt");
    expect(excerptInput).toHaveAttribute("id", "excerpt");
    expect(excerptInput).toHaveAttribute("name", "excerpt");
    expect(excerptInput).toHaveValue("");
    expect(excerptInput).toBeRequired();
    expect(excerptInput).toHaveAttribute("placeholder", "Write a brief summary of your story...");
    // Content
    const contentInput = within(blogForm).getByLabelText("Content");
    expect(contentInput).toHaveAttribute("id", "content");
    expect(contentInput).toHaveAttribute("name", "content");
    expect(contentInput).toHaveValue("");
    expect(contentInput).toBeRequired();
    expect(contentInput).toHaveAttribute("placeholder", "Share your story with the world...");
  });

  // component render with provided values
  test("render with provided values", () => {
    render(
      <BlogForm
        title="Create New Blog"
        btnTitle="Submit New Blog"
        initialData={{
          title: "New Blog Title",
          excerpt: "New Blog Excerpt",
          content: "New Blog Content",
        }}
      />,
    );
    const blogForm = screen.getByRole("blogform");
    // Title
    expect(within(blogForm).getByText("Create New Blog")).toBeInTheDocument();
    // Button
    expect(within(blogForm).getByRole("button", { name: "Submit New Blog" })).toBeInTheDocument();
    expect(within(blogForm).getByRole("button", { name: "Submit New Blog" })).toHaveAttribute(
      "type",
      "submit",
    );
    // Title
    const titleInput = within(blogForm).getByLabelText("Title");
    expect(titleInput).toHaveAttribute("id", "title");
    expect(titleInput).toHaveAttribute("name", "title");
    expect(titleInput).toHaveValue("New Blog Title");
    expect(titleInput).toBeRequired();
    expect(titleInput).toHaveAttribute("placeholder", "Enter your story title...");
    // Excerpt
    const excerptInput = within(blogForm).getByLabelText("Excerpt");
    expect(excerptInput).toHaveAttribute("id", "excerpt");
    expect(excerptInput).toHaveAttribute("name", "excerpt");
    expect(excerptInput).toHaveValue("New Blog Excerpt");
    expect(excerptInput).toBeRequired();
    expect(excerptInput).toHaveAttribute("placeholder", "Write a brief summary of your story...");
    // Content
    const contentInput = within(blogForm).getByLabelText("Content");
    expect(contentInput).toHaveAttribute("id", "content");
    expect(contentInput).toHaveAttribute("name", "content");
    expect(contentInput).toHaveValue("New Blog Content");
    expect(contentInput).toBeRequired();
    expect(contentInput).toHaveAttribute("placeholder", "Share your story with the world...");
  });

  // component input works correctly
  test("input works correctly", async () => {
    render(<BlogForm />);
    const blogForm = screen.getByRole("blogform");
    // Title
    const titleInput = within(blogForm).getByLabelText("Title");
    expect(titleInput).toHaveValue("");
    // Input Text
    await userEvent.type(titleInput, "Tiger Blogs");
    expect(titleInput).toHaveValue("Tiger Blogs");
    // Clear Text
    await userEvent.clear(titleInput);
    expect(titleInput).toHaveValue("");

    // Excerpt
    const excerptInput = within(blogForm).getByLabelText("Excerpt");
    expect(excerptInput).toHaveValue("");
    // Input Text
    await userEvent.type(excerptInput, "Tiger Blogs Short Summary");
    expect(excerptInput).toHaveValue("Tiger Blogs Short Summary");
    // Clear Text
    await userEvent.clear(excerptInput);
    expect(excerptInput).toHaveValue("");

    // Content
    const contentInput = within(blogForm).getByLabelText("Content");
    expect(contentInput).toHaveValue("");
    // Input Text
    await userEvent.type(contentInput, "Tiger Blogs Full Content");
    expect(contentInput).toHaveValue("Tiger Blogs Full Content");
    // Clear Text
    await userEvent.clear(contentInput);
    expect(contentInput).toHaveValue("");
  });

  // component submit function works
  test("submit function works", async () => {
    const handleSubmitFunc = async (_formData: CreateBlogInput) => await true;
    render(<BlogForm handleSubmit={handleSubmitFunc} />);
    const blogForm = screen.getByRole("blogform");
    expect(blogForm).toBeInTheDocument();
    const button = screen.getByRole("button", { name: "Publish Story" });
    await userEvent.click(button);
    waitFor(() => {
      expect(handleSubmitFunc).toHaveBeenCalled();
    });
  });

  // component edit submit function works
  test("edit submit function works", async () => {
    const handleEditSubmitFunc = async (_formData: UpdateBlogInput) => await true;
    render(<BlogForm isEdit={true} handleEditSubmit={handleEditSubmitFunc} />);
    const blogForm = screen.getByRole("blogform");
    expect(blogForm).toBeInTheDocument();
    const button = screen.getByRole("button", { name: "Publish Story" });
    await userEvent.click(button);
    waitFor(() => {
      expect(handleEditSubmitFunc).toHaveBeenCalled();
    });
  });

  // component render spinner on submit
  test("render spinner on submit", async () => {
    const handleSubmitFunc = async (_formData: CreateBlogInput) => await true;
    render(<BlogForm handleSubmit={handleSubmitFunc} />);
    const blogForm = screen.getByRole("blogform");
    expect(blogForm).toBeInTheDocument();
    const button = screen.getByRole("button", { name: "Publish Story" });
    expect(within(button).queryByRole("spinner")).not.toBeInTheDocument();
    await userEvent.click(button);
    waitFor(() => {
      expect(screen.getByRole("spinner")).toBeInTheDocument();
    });
    expect(within(button).queryByRole("spinner")).not.toBeInTheDocument();
  });

  // component render disabled button on submit
  test("render disabled button on submit", async () => {
    const handleSubmitFunc = async (_formData: CreateBlogInput) => await true;
    render(<BlogForm handleSubmit={handleSubmitFunc} />);
    const blogForm = screen.getByRole("blogform");
    expect(blogForm).toBeInTheDocument();
    const button = screen.getByRole("button", { name: "Publish Story" });
    expect(button).not.toBeDisabled();
    await userEvent.click(button);
    waitFor(() => {
      expect(button).toBeDisabled();
    });
    expect(button).not.toBeDisabled();
  });
});
