import { render, screen } from "@testing-library/react";
import UserAvatar from "../../../components/ui/userAvatar";

describe("UserAvatar component", () => {
  // component render user avatar with default value
  test("render user avatar with default value", () => {
    render(<UserAvatar />);
    expect(screen.getByRole("useravatar")).toBeInTheDocument();
    expect(screen.getByRole("useravatar")).toHaveTextContent("A");
  });

  // component render user avatar with provided value
  test("render user avatar with provided value", () => {
    render(<UserAvatar name="Tiger" />);
    expect(screen.getByRole("useravatar")).toBeInTheDocument();
    expect(screen.getByRole("useravatar")).toHaveTextContent("T");
  });
});
