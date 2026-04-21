import { vi } from "vitest";
import { useBlog } from "../../hooks/blog";
import axiosInstance from "../../utils/axios";
import { renderHook, waitFor } from "@testing-library/react";
import { errorHandle } from "../../utils/errors/errorHandle";

describe("useBlog hook", () => {
  // hook fetches and sets blog data correctly
  test("fetches and sets blog data correctly", async () => {
    const mockResponse = {
      data: {
        blogData: {
          id: "1",
          title: "Tiger Writes Title",
          excerpt: "Tiger Writes Excerpt",
          content: "Tiger Writes Content",
          createdAt: "2026-04-19T10:00:00.000Z",
          authorId: "123",
          author: {
            name: "Tiger",
            bio: "Tiger Writes",
          },
        },
      },
    };
    axiosInstance.get = vi.fn().mockResolvedValue(mockResponse);
    const { result } = renderHook(() => useBlog("1"));
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.blogData.id).toBe("1");
    expect(result.current.blogData.title).toBe("Tiger Writes Title");
    expect(result.current.blogData.excerpt).toBe("Tiger Writes Excerpt");
    expect(result.current.blogData.content).toBe("Tiger Writes Content");
    expect(result.current.blogData.createdAt).toBe("2026-04-19");
    expect(result.current.blogData.authorId).toBe("123");
    expect(result.current.blogData.author?.name).toBe("Tiger");
    expect(result.current.blogData.author?.bio).toBe("Tiger Writes");
  });

  // hook handles error correctly
  test("handles error correctly", async () => {
    const mockError = new Error("API failed");
    axiosInstance.get = vi.fn().mockRejectedValue(mockError);
    const { result } = renderHook(() => useBlog("1"));
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(errorHandle).toHaveBeenCalledWith(mockError);
    expect(result.current.blogData.id).toBe("");
    expect(result.current.blogData.title).toBe("");
    expect(result.current.blogData.excerpt).toBe("");
    expect(result.current.blogData.content).toBe("");
    expect(result.current.blogData.createdAt).toBe("");
    expect(result.current.blogData.authorId).toBe("");
    expect(result.current.blogData.author?.name).toBe("");
    expect(result.current.blogData.author?.bio).toBe("");
  });
});
