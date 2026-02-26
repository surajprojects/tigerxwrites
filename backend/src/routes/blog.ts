import { Hono } from "hono";
import { handleError } from "../utils/error";
import { clearCache } from "../utils/clearCache";
import { initPrisma, initRedis } from "../utils/db";
import { blogAuth } from "../middlewares/blogAuth";
import { Bindings, Variables } from "../utils/init";
import { Blog } from "../../prisma/generated/prisma";
import {
  createBlogInput,
  CreateBlogInput,
  updateBlogInput,
  UpdateBlogInput,
} from "@tigerxinsights/tigerxwrites";

// Blog router (handles CRUD for blogs)
export const blogRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// GET /page/:pageNumber - fetch all blogs by page number
blogRouter.get("/page/:pageNumber", async (c) => {
  try {
    const page = c.req.param("pageNumber");
    const take = 9;
    const skip = (Number(page) - 1) * take;

    const redis = initRedis(c);
    const cached: { blogsCount: number; bulkBlogs: Blog[] } | null = await redis.get(
      `blogsPage${page}`,
    );

    if (cached) {
      return c.json({
        message: "Successfully found all blogs!!!",
        bulkBlogs: cached.bulkBlogs,
        blogsCount: cached.blogsCount,
      });
    }

    const prisma = initPrisma(c);
    const bulkBlogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      skip,
      take,
    });

    if (bulkBlogs.length < 1) {
      c.status(404);
      return c.json({ message: "Blogs not found!!!" });
    }

    if (!c.get("blogCount")) {
      c.set("blogCount", await prisma.blog.count());
    }

    const blogsCount = c.get("blogCount");
    await redis.set(`blogsPage${page}`, JSON.stringify({ bulkBlogs, blogsCount }), { ex: 1800 }); // 30 minutes
    return c.json({ message: "Successfully found all blogs!!!", bulkBlogs, blogsCount });
  } catch (error) {
    return c.json(handleError(error, c));
  }
});

// GET /:id - fetch single blog by id
blogRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const redis = initRedis(c);

    const cached: { blogData: Blog } | null = await redis.get(`blog${id}`);

    if (cached) {
      return c.json({ message: "Successfully found the blog!!!", blogData: cached.blogData });
    }

    const prisma = initPrisma(c);
    const blogData = await prisma.blog.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        excerpt: true,
        content: true,
        authorId: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            bio: true,
          },
        },
      },
    });

    if (!blogData) {
      c.status(404);
      return c.json({ message: "Blog not found!!!" });
    }

    await redis.set(`blog${id}`, JSON.stringify({ blogData }), { ex: 900 }); // 15 mintues
    return c.json({ message: "Successfully found the blog!!!", blogData });
  } catch (error) {
    return c.json(handleError(error, c));
  }
});

// Protect routes with blogAuth middleware
blogRouter.use("/*", blogAuth);

// POST / - create a new blog (requires user auth)
blogRouter.post("/", async (c) => {
  try {
    const userData = c.get("userData");
    const body: CreateBlogInput = await c.req.json();
    const parsedInput = createBlogInput.safeParse(body);

    if (!parsedInput.success) {
      c.status(400);
      return c.json({ message: "Invalid input!!!", details: parsedInput.error.issues });
    }

    const redis = initRedis(c);
    await clearCache(redis, "blogsPage*");

    const prisma = initPrisma(c);
    const blogData = await prisma.blog.create({
      data: {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        authorId: userData.id,
      },
      select: {
        id: true,
        title: true,
        excerpt: true,
        content: true,
        authorId: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            bio: true,
          },
        },
      },
    });

    c.set("blogCount", await prisma.blog.count());
    await redis.set(`blog${blogData.id}`, JSON.stringify({ blogData }), { ex: 900 }); // 15 mintues
    await redis.publish("newBlog", JSON.stringify({ blogData }));
    return c.json({ message: "Successfully created the blog!!!", blogData });
  } catch (error) {
    return c.json(handleError(error, c));
  }
});

// PATCH /:id - update blog (only if user is author)
blogRouter.patch("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const userData = c.get("userData");
    const body: UpdateBlogInput = await c.req.json();
    const parsedInput = updateBlogInput.safeParse(body);

    if (!parsedInput.success) {
      c.status(400);
      return c.json({ message: "Invalid input!!!", details: parsedInput.error.issues });
    }

    const redis = initRedis(c);
    await redis.del(`blog${id}`);
    await clearCache(redis, "blogsPage*");

    const prisma = initPrisma(c);
    const blogData = await prisma.blog.update({
      where: {
        id,
        authorId: userData.id,
      },
      data: {
        ...(parsedInput.data.title && { title: parsedInput.data.title }),
        ...(parsedInput.data.excerpt && { excerpt: parsedInput.data.excerpt }),
        ...(parsedInput.data.content && { content: parsedInput.data.content }),
      },
      select: {
        id: true,
        title: true,
        excerpt: true,
        content: true,
        authorId: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            bio: true,
          },
        },
      },
    });

    await redis.set(`blog${blogData.id}`, JSON.stringify({ blogData }), { ex: 900 }); // 15 mintues
    return c.json({ message: "Successfully updated the blog!!!", blogData });
  } catch (error) {
    return c.json(handleError(error, c));
  }
});

// DELETE /:id - delete blog (only if user is author)
blogRouter.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const userData = c.get("userData");

    const redis = initRedis(c);
    await redis.del(`blog${id}`);
    await clearCache(redis, "blogsPage*");

    const prisma = initPrisma(c);
    await prisma.blog.delete({
      where: {
        id,
        authorId: userData.id,
      },
    });
    c.set("blogCount", await prisma.blog.count());
    return c.json({ message: "Successfully deleted the blog!!!" });
  } catch (error) {
    return c.json(handleError(error, c));
  }
});
