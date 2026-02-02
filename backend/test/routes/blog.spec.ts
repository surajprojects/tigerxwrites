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
  blogAuth: async (c: any, next: any) => {
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

describe("Blog Router", () => {
  beforeEach(() => vi.clearAllMocks());

  /* ---------- GET /page/:pageNumber (cache hit) ---------- */
  it("should return blogs from cache", async () => {
    (initRedis as any).mockReturnValue({
      get: vi.fn().mockResolvedValue({
        bulkBlogs: [{ id: "1", title: "cached" }],
        blogsCount: 5,
      }),
    });

    const res = await app.request("/api/v1/blog/page/1", {}, env);
    const body = (await res.json()) as any;

    expect(body.bulkBlogs[0].title).toBe("cached");
    expect(res.status).toBe(200);
  });

  /* ---------- GET /page/:pageNumber (DB fetch) ---------- */
  it("should fetch blogs from DB and cache them", async () => {
    const redisMock = { get: vi.fn().mockResolvedValue(null), set: vi.fn() };
    (initRedis as any).mockReturnValue(redisMock);

    const prismaMock = {
      blog: {
        findMany: vi.fn().mockResolvedValue([{ id: "1", title: "dbBlog" }]),
        count: vi.fn().mockResolvedValue(10),
      },
    };
    (initPrisma as any).mockReturnValue(prismaMock);

    const res = await app.request("/api/v1/blog/page/1", {}, env);
    const body = (await res.json()) as any;

    expect(prismaMock.blog.findMany).toHaveBeenCalled();
    expect(redisMock.set).toHaveBeenCalled();
    expect(body.blogsCount).toBe(10);
  });

  /* ---------- GET /:id (cache hit) ---------- */
  it("should return single blog from cache", async () => {
    (initRedis as any).mockReturnValue({
      get: vi.fn().mockResolvedValue({
        blogData: { id: "1", title: "cachedBlog" },
      }),
    });

    const res = await app.request("/api/v1/blog/1", {}, env);
    const body = (await res.json()) as any;

    expect(body.blogData.title).toBe("cachedBlog");
  });

  /* ---------- POST / (create blog) ---------- */
  it("should create a blog", async () => {
    (createBlogInput.safeParse as any).mockReturnValue({ success: true, data: {} });

    const redisMock = { set: vi.fn() };
    (initRedis as any).mockReturnValue(redisMock);

    const prismaMock = {
      blog: {
        create: vi.fn().mockResolvedValue({ id: "blog_1" }),
        count: vi.fn().mockResolvedValue(1),
      },
    };
    (initPrisma as any).mockReturnValue(prismaMock);

    const res = await app.request(
      "/api/v1/blog",
      {
        method: "POST",
        body: JSON.stringify({ title: "T", excerpt: "E", content: "C" }),
        headers: { "Content-Type": "application/json" },
      },
      env,
    );

    const body = (await res.json()) as any;

    expect(clearCache).toHaveBeenCalled();
    expect(prismaMock.blog.create).toHaveBeenCalled();
    expect(body.message).toBe("Successfully created the blog!!!");
  });

  /* ---------- PATCH /:id ---------- */
  it("should update blog", async () => {
    (updateBlogInput.safeParse as any).mockReturnValue({ success: true, data: { title: "New" } });

    const redisMock = { del: vi.fn(), set: vi.fn() };
    (initRedis as any).mockReturnValue(redisMock);

    const prismaMock = {
      blog: { update: vi.fn().mockResolvedValue({ id: "1" }) },
    };
    (initPrisma as any).mockReturnValue(prismaMock);

    const res = await app.request(
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

  /* ---------- DELETE /:id ---------- */
  it("should delete blog", async () => {
    const redisMock = { del: vi.fn() };
    (initRedis as any).mockReturnValue(redisMock);

    const prismaMock = {
      blog: {
        delete: vi.fn(),
        count: vi.fn().mockResolvedValue(0),
      },
    };
    (initPrisma as any).mockReturnValue(prismaMock);

    const res = await app.request("/api/v1/blog/1", { method: "DELETE" }, env);
    const body = (await res.json()) as any;

    expect(prismaMock.blog.delete).toHaveBeenCalled();
    expect(body.message).toBe("Successfully deleted the blog!!!");
  });
});
