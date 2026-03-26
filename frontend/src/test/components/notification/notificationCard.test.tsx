import { render, screen, within } from "@testing-library/react";
import NotificationCard from "../../../components/notification/notificationCard";

describe("NotificationCard component", () => {
  // component render with children
  test("render with children", () => {
    render(
      <NotificationCard>
        <p role="children">Tiger Blogs</p>
      </NotificationCard>,
    );
    const notificationCard = screen.getByRole("notificationcard");
    expect(notificationCard).toBeInTheDocument();
    expect(within(notificationCard).getByRole("children")).toHaveTextContent("Tiger Blogs");
  });
});
