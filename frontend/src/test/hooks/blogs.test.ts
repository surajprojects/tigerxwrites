import { vi } from "vitest";
import { useBlogs } from "../../hooks/blogs";
import axiosInstance from "../../utils/axios";
import { renderHook, waitFor } from "@testing-library/react";
import { errorHandle } from "../../utils/errors/errorHandle";

vi.mock("../../../utils/axios");

vi.mock("../../utils/errors/errorHandle", () => ({
  errorHandle: vi.fn(),
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe("useBlogs hook", () => {
  // hook fetches blogs and sets state correctly
  test("fetches blogs and sets state correctly", async () => {
    const mockResponse = {
      data: {
        bulkBlogs: [
          { id: "1", title: "Blog 1" },
          { id: "2", title: "Blog 2" },
        ],
        blogsCount: 18,
      },
    };
    axiosInstance.get = vi.fn().mockResolvedValue(mockResponse);
    const { result } = renderHook(() => useBlogs(1));
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.blogsData).toHaveLength(2);
    expect(result.current.blogsCount).toBe(18);
    expect(result.current.totalPages).toBe(2);
  });

  test("handles API error correctly", async () => {
    const mockError = new Error("API failed");
    axiosInstance.get = vi.fn().mockRejectedValue(mockError);
    const { result } = renderHook(() => useBlogs(1));
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(errorHandle).toHaveBeenCalledWith(mockError);
    expect(result.current.blogsData).toEqual([]);
    expect(result.current.blogsCount).toBe(0);
  });

  test("refetches data when page changes", async () => {
    const firstResponse = {
      data: {
        bulkBlogs: [{ id: "1", title: "Page 1 Blog" }],
        blogsCount: 9,
      },
    };
    const secondResponse = {
      data: {
        bulkBlogs: [{ id: "2", title: "Page 2 Blog" }],
        blogsCount: 9,
      },
    };
    axiosInstance.get = vi.fn().mockResolvedValue(firstResponse);
    const { result, rerender } = renderHook(({ page }) => useBlogs(page), {
      initialProps: { page: 1 },
    });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.blogsData[0].title).toBe("Page 1 Blog");
    axiosInstance.get = vi.fn().mockResolvedValue(secondResponse);
    rerender({ page: 2 });
    await waitFor(() => {
      expect(result.current.blogsData[0].title).toBe("Page 2 Blog");
    });
  });
});
