/* eslint-disable @typescript-eslint/no-explicit-any */

import { vi } from "vitest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import userEvent from "@testing-library/user-event";
import { errorHandle } from "../../../utils/errors/errorHandle";
import { render, screen, waitFor } from "@testing-library/react";
import DeleteBlogBtn from "../../../components/button/deleteBlogBtn";

describe("DeleteBlogBtn component", () => {
  // component render with default text and button type
  test("render with default text and button type", () => {
    render(<DeleteBlogBtn />);
    const button = screen.getByRole("button", {
      name: "Delete",
    });
    expect(button).toHaveAttribute("type", "button");
  });

  // component handleDelete function works onClick
  test("handleDelete function works onClick", async () => {
    axiosInstance.delete = vi.fn().mockResolvedValue({});
    render(<DeleteBlogBtn />);
    const button = screen.getByRole("button", {
      name: "Delete",
    });
    await userEvent.click(button);
    expect(axiosInstance.delete).toHaveBeenCalledWith("/blog/#");
    expect(toast.success).toHaveBeenCalled();
  });

  // component navigation works on request success
  test("navigation works on request success", async () => {
    axiosInstance.delete = vi.fn().mockResolvedValue({});
    const navigate = useNavigate();
    render(<DeleteBlogBtn />);
    const button = screen.getByRole("button", {
      name: "Delete",
    });
    await userEvent.click(button);
    expect(axiosInstance.delete).toHaveBeenCalledWith("/blog/#");
    expect(navigate).toHaveBeenCalledWith(0);
    expect(toast.success).toHaveBeenCalled();
  });

  // component handleDelete function works with default blog id
  test("handleDelete function works with default blog id", async () => {
    axiosInstance.delete = vi.fn().mockResolvedValue({});
    render(<DeleteBlogBtn />);
    const button = screen.getByRole("button", {
      name: "Delete",
    });
    await userEvent.click(button);
    expect(axiosInstance.delete).toHaveBeenCalledWith("/blog/#");
    expect(toast.success).toHaveBeenCalled();
  });

  // component handleDelete function works with provided blog id
  test("handleDelete function works with provided blog id", async () => {
    axiosInstance.delete = vi.fn().mockResolvedValue({});
    render(<DeleteBlogBtn blogId="123" />);
    const button = screen.getByRole("button", {
      name: "Delete",
    });
    await userEvent.click(button);
    expect(axiosInstance.delete).toHaveBeenCalledWith("/blog/123");
    expect(toast.success).toHaveBeenCalled();
  });

  // component handleDelete function works when request fails
  test("handleDelete function works when request fails", async () => {
    axiosInstance.delete = vi.fn().mockRejectedValue(new Error("Failed"));
    render(<DeleteBlogBtn />);
    const button = screen.getByRole("button", {
      name: "Delete",
    });
    await userEvent.click(button);
    expect(axiosInstance.delete).toHaveBeenCalledWith("/blog/#");
    expect(toast.success).not.toHaveBeenCalled();
    expect(errorHandle).toHaveBeenCalled();
  });

  // component render doesn't show spinner when is loading is false
  test("button disabled flow when handleDelete function is called", async () => {
    let resolvePromise: any;
    (axiosInstance.delete as any) = vi.fn(() => {
      return new Promise((resolve) => {
        resolvePromise = resolve;
      });
    });
    render(<DeleteBlogBtn />);
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
    await userEvent.click(button);
    await waitFor(() => {
      expect(button).toBeDisabled();
      resolvePromise({});
    });
  });
});
