import { vi } from "vitest";
import axiosInstance from "../../utils/axios";

export function setupAxiosMock() {
  axiosInstance.get = vi.fn().mockImplementation((url: string) => {
    // user/me path
    if (url.includes("user/me")) {
      return Promise.resolve({
        data: {
          userData: {
            id: "1",
            name: "tiger",
            email: "email@gmail.com",
            bio: null,
          },
        },
      });
    }

    // blog/page path
    if (url.includes("blog/page")) {
      if (url.includes("blog/page/1")) {
        return Promise.resolve({
          data: {
            bulkBlogs: [
              {
                id: "1",
                title: "blog 1",
                content: "content 1",
                excerpt: "excerpt 1",
                published: true,
                authorId: "1",
                author: {
                  name: "blog author 1",
                },
                createdAt: "2026-04-19T10:00:00.000Z",
                updatedAt: "2026-04-19T10:00:00.000Z",
              },
              {
                id: "2",
                title: "blog 2",
                content: "content 2",
                excerpt: "excerpt 2",
                published: true,
                authorId: "2",
                author: {
                  name: "blog author 2",
                },
                createdAt: "2026-04-19T10:00:00.000Z",
                updatedAt: "2026-04-19T10:00:00.000Z",
              },
            ],
            blogsCount: 2,
          },
        });
      }
      return Promise.resolve({
        data: {
          bulkBlogs: [],
          blogsCount: 0,
        },
      });
    }

    // blog/:blogId path
    if (url.includes("blog")) {
      if (url.includes("blog/1")) {
        return Promise.resolve({
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
        });
      }
      return Promise.resolve({
        data: {
          blogData: {
            id: "",
            title: "",
            excerpt: "",
            content: "",
            createdAt: "",
            authorId: "",
            author: {
              name: "",
              bio: "",
            },
          },
        },
      });
    }

    // default
    return Promise.resolve({ data: {} });
  });
}
