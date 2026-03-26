import { vi } from "vitest";
import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";
import NotificationData from "../../../components/notification/notificationData";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigate,
}));

describe("NotificationData component", () => {
  // component render with provided values
  test("render with provided values", () => {
    const toggleFunc = () => {};

    render(
      <NotificationData
        blogData={{
          id: "",
          title: "blog title",
          excerpt: "",
          content: "",
          authorId: "",
          author: {
            id: "",
            name: "",
            bio: "",
            email: "",
          },
          published: false,
          createdAt: "",
          updatedAt: "",
        }}
        toggleShowUpdates={toggleFunc}
      />,
    );

    const notificationData = screen.getByRole("notificationdata");
    expect(notificationData).toBeInTheDocument();
    expect(within(notificationData).getByText("blog title")).toBeInTheDocument();
  });

  // component onClick function works
  test("onClick function works", async () => {
    const toggleFunc = vi.fn();
    const navigate = useNavigate();

    render(
      <NotificationData
        blogData={{
          id: "123",
          title: "blog title",
          excerpt: "",
          content: "",
          authorId: "",
          author: {
            id: "",
            name: "",
            bio: "",
            email: "",
          },
          published: false,
          createdAt: "",
          updatedAt: "",
        }}
        toggleShowUpdates={toggleFunc}
      />,
    );

    const notificationData = screen.getByRole("notificationdata");
    expect(notificationData).toBeInTheDocument();
    expect(within(notificationData).getByText("blog title")).toBeInTheDocument();
    await userEvent.click(notificationData);
    expect(toggleFunc).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith("/blogs/123");
  });
});
