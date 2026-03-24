import { vi } from "vitest";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import SignOutBtn from "../../../components/button/signOutBtn";
import { errorHandle } from "../../../utils/errors/errorHandle";

vi.mock("../../../utils/axios");

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
  },
}));

vi.mock("../../../utils/errors/errorHandle", () => ({
  errorHandle: vi.fn(),
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe("SignOutBtn component", () => {
  // component render button element with sign out text
  test("render button element with sign out text", () => {
    render(<SignOutBtn />);
    const button = screen.getByRole("button", {
      name: "Sign Out",
    });
    expect(button).toBeInTheDocument();
  });

  // component handleSignOut function works onClick
  test("handleSignOut function works onClick", async () => {
    axiosInstance.get = vi.fn().mockResolvedValue({});
    render(<SignOutBtn />);
    const button = screen.getByRole("button", {
      name: "Sign Out",
    });
    await userEvent.click(button);
    expect(axiosInstance.get).toHaveBeenCalledWith("/user/signout");
    expect(toast.success).toHaveBeenCalled();
  });

  // component handleSignOut function works when request fails
  test("handleSignOut function works when request fails", async () => {
    axiosInstance.get = vi.fn().mockRejectedValue(new Error("Failed"));
    render(<SignOutBtn />);
    const button = screen.getByRole("button", {
      name: "Sign Out",
    });
    await userEvent.click(button);
    expect(axiosInstance.get).toHaveBeenCalledWith("/user/signout");
    expect(toast.success).not.toHaveBeenCalled();
    expect(errorHandle).toHaveBeenCalled();
  });
});
