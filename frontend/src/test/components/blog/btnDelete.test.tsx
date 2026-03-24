import { vi } from "vitest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import BtnDelete from "../../../components/blog/btnDelete";
import { errorHandle } from "../../../utils/errors/errorHandle";

vi.mock("../../../utils/axios");

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
  },
}));

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigate,
}));

vi.mock("../../../utils/errors/errorHandle", () => ({
  errorHandle: vi.fn(),
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe("BtnDelete component", () => {
  // component render with default text and provided blog id
  test("render default text and provided blog id", () => {
    render(<BtnDelete blogId="123" />);
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toBeInTheDocument();
  });

  // component handleClick function works onClick
  test("handleClick function works onClick", async () => {
    axiosInstance.delete = vi.fn().mockResolvedValue({});
    render(<BtnDelete blogId="123" />);
    const button = screen.getByRole("button", {
      name: "Delete",
    });
    await userEvent.click(button);
    expect(axiosInstance.delete).toHaveBeenCalledWith("/blog/123");
    expect(toast.success).toHaveBeenCalled();
  });

  // component navigation works on request success
  test("navigation works on request success", async () => {
    axiosInstance.delete = vi.fn().mockResolvedValue({});
    const navigate = useNavigate();
    render(<BtnDelete blogId="123" />);
    const button = screen.getByRole("button", {
      name: "Delete",
    });
    await userEvent.click(button);
    expect(axiosInstance.delete).toHaveBeenCalledWith("/blog/123");
    expect(navigate).toHaveBeenCalledWith("/blogs");
    expect(toast.success).toHaveBeenCalled();
  });

  // component handleClick function works when request fails
  test("handleClick function works when request fails", async () => {
    axiosInstance.delete = vi.fn().mockRejectedValue(new Error("Failed"));
    render(<BtnDelete blogId="123" />);
    const button = screen.getByRole("button", {
      name: "Delete",
    });
    await userEvent.click(button);
    expect(axiosInstance.delete).toHaveBeenCalledWith("/blog/123");
    expect(toast.success).not.toHaveBeenCalled();
    expect(errorHandle).toHaveBeenCalled();
  });
});
