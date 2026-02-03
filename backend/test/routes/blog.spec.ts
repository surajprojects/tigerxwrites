import { Hono } from "hono";
import { blogRouter } from "../../src/routes/blog";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Bindings, Variables } from "../../src/utils/init";

/* ---------------- MOCKS ---------------- */

vi.mock("../../src/utils/db", () => ({
  initPrisma: vi.fn(),
  initRedis: vi.fn(),
}));

vi.mock("../../src/utils/clearCache", () => ({
  clearCache: vi.fn(),
}));

vi.mock("../../src/middlewares/blogAuth", () => ({
  blogAuth: async (c: { set: (k: string, v: string) => void }, next: () => Promise<void>) => {
    c.set("userId", "user_1");
    await next();
  },
}));

vi.mock("@tigerxinsights/tigerxwrites", () => ({
  createBlogInput: { safeParse: vi.fn() },
  updateBlogInput: { safeParse: vi.fn() },
}));

/* ---------------- IMPORT AFTER MOCK ---------------- */

import { initPrisma, initRedis } from "../../src/utils/db";
import { clearCache } from "../../src/utils/clearCache";
import { createBlogInput, updateBlogInput } from "@tigerxinsights/tigerxwrites";

/* ---------------- APP SETUP ---------------- */

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();
app.route("/api/v1/blog", blogRouter);

const env = { JWT_SECRET: "jwt_secret" };

/* ---------------- HELPER TYPES ---------------- */

type RedisMock = {
  get?: ReturnType<typeof vi.fn>;
  set?: ReturnType<typeof vi.fn>;
  del?: ReturnType<typeof vi.fn>;
};

type PrismaBlogMock = {
  blog: {
    findMany?: ReturnType<typeof vi.fn>;
    count?: ReturnType<typeof vi.fn>;
    create?: ReturnType<typeof vi.fn>;
    update?: ReturnType<typeof vi.fn>;
    delete?: ReturnType<typeof vi.fn>;
  };
};

describe("Blog Router", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return blogs from cache", async () => {
    const redisMock: RedisMock = {
      get: vi.fn().mockResolvedValue({
        bulkBlogs: [{ id: "1", title: "cached" }],
        blogsCount: 5,
      }),
    };

    vi.mocked(initRedis).mockReturnValue(redisMock as never);

    const res = await app.request("/api/v1/blog/page/1", {}, env);
    const body = (await res.json()) as { bulkBlogs: { title: string }[] };

    expect(body.bulkBlogs[0].title).toBe("cached");
    expect(res.status).toBe(200);
  });

  it("should fetch blogs from DB and cache them", async () => {
    const redisMock: RedisMock = { get: vi.fn().mockResolvedValue(null), set: vi.fn() };
    vi.mocked(initRedis).mockReturnValue(redisMock as never);

    const prismaMock: PrismaBlogMock = {
      blog: {
        findMany: vi.fn().mockResolvedValue([{ id: "1", title: "dbBlog" }]),
        count: vi.fn().mockResolvedValue(10),
      },
    };

    vi.mocked(initPrisma).mockReturnValue(prismaMock as never);

    const res = await app.request("/api/v1/blog/page/1", {}, env);
    const body = (await res.json()) as { blogsCount: number };

    expect(prismaMock.blog.findMany).toHaveBeenCalled();
    expect(redisMock.set).toHaveBeenCalled();
    expect(body.blogsCount).toBe(10);
  });

  it("should return single blog from cache", async () => {
    const redisMock: RedisMock = {
      get: vi.fn().mockResolvedValue({ blogData: { id: "1", title: "cachedBlog" } }),
    };

    vi.mocked(initRedis).mockReturnValue(redisMock as never);

    const res = await app.request("/api/v1/blog/1", {}, env);
    const body = (await res.json()) as { blogData: { title: string } };

    expect(body.blogData.title).toBe("cachedBlog");
  });

  it("should create a blog", async () => {
    vi.mocked(createBlogInput.safeParse).mockReturnValue({
      success: true,
      data: { title: "T", excerpt: "E", content: "C" },
    } as never);

    const redisMock: RedisMock = { set: vi.fn() };
    vi.mocked(initRedis).mockReturnValue(redisMock as never);

    const prismaMock: PrismaBlogMock = {
      blog: {
        create: vi.fn().mockResolvedValue({ id: "blog_1" }),
        count: vi.fn().mockResolvedValue(1),
      },
    };

    vi.mocked(initPrisma).mockReturnValue(prismaMock as never);

    const res = await app.request(
      "/api/v1/blog",
      {
        method: "POST",
        body: JSON.stringify({ title: "T", excerpt: "E", content: "C" }),
        headers: { "Content-Type": "application/json" },
      },
      env,
    );

    const body = (await res.json()) as { message: string };

    expect(clearCache).toHaveBeenCalled();
    expect(prismaMock.blog.create).toHaveBeenCalled();
    expect(body.message).toBe("Successfully created the blog!!!");
  });

  it("should update blog", async () => {
    vi.mocked(updateBlogInput.safeParse).mockReturnValue({ success: true, data: { title: "New" } });

    const redisMock: RedisMock = { del: vi.fn(), set: vi.fn() };
    vi.mocked(initRedis).mockReturnValue(redisMock as never);

    const prismaMock: PrismaBlogMock = { blog: { update: vi.fn().mockResolvedValue({ id: "1" }) } };
    vi.mocked(initPrisma).mockReturnValue(prismaMock as never);

    await app.request(
      "/api/v1/blog/1",
      {
        method: "PATCH",
        body: JSON.stringify({ title: "New" }),
        headers: { "Content-Type": "application/json" },
      },
      env,
    );

    expect(prismaMock.blog.update).toHaveBeenCalled();
  });

  it("should delete blog", async () => {
    const redisMock: RedisMock = { del: vi.fn() };
    vi.mocked(initRedis).mockReturnValue(redisMock as never);

    const prismaMock: PrismaBlogMock = {
      blog: { delete: vi.fn(), count: vi.fn().mockResolvedValue(0) },
    };

    vi.mocked(initPrisma).mockReturnValue(prismaMock as never);

    const res = await app.request("/api/v1/blog/1", { method: "DELETE" }, env);
    const body = (await res.json()) as { message: string };

    expect(prismaMock.blog.delete).toHaveBeenCalled();
    expect(body.message).toBe("Successfully deleted the blog!!!");
  });
});
