import { Hono } from "hono";
import { initPrisma } from "../utils/db";
import { handleError } from "../utils/error";
import { blogAuth } from "../middlewares/blogAuth";
import { Bindings, Variables } from "../utils/init";
import { createBlogInput, CreateBlogInput, updateBlogInput, UpdateBlogInput } from "@tigerxinsights/tigerxwrites";

// Blog router (handles CRUD for blogs)
export const blogRouter = new Hono<{ Bindings: Bindings, Variables: Variables }>();

// GET /page/:pageNumber - fetch all blogs by page number
blogRouter.get("/page/:pageNumber", async (c) => {
    try {
        const page = c.req.param("pageNumber");
        const take = 9;
        const skip = (Number(page) - 1) * take;
        const prisma = initPrisma(c);
        const bulkBlogs = await prisma.blog.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
            skip,
            take,
        });
        if (bulkBlogs.length < 1) {
            c.status(404);
            return c.json({ message: "Blogs not found!!!" });
        };
        if (!c.get("blogCount")) {
            c.set("blogCount", await prisma.blog.count());
        };
        const blogsCount = c.get("blogCount");
        return c.json({ message: "Successfully found all blogs!!!", bulkBlogs, blogsCount });
    }
    catch (error) {
        return c.json(handleError(error, c));
    }
});

// GET /:id - fetch single blog by id
blogRouter.get("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const prisma = initPrisma(c);
        const blogData = await prisma.blog.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        bio: true,
                    }
                }
            }
        });
        if (!blogData) {
            c.status(404);
            return c.json({ message: "Blog not found!!!" });
        };
        return c.json({ message: "Successfully found the blog!!!", blogData });
    }
    catch (error) {
        return c.json(handleError(error, c));
    }
});

// Protect routes with blogAuth middleware
blogRouter.use("/*", blogAuth);

// POST / - create a new blog (requires user auth)
blogRouter.post("/", async (c) => {
    try {
        const userId = c.get("userId");
        const prisma = initPrisma(c);
        const body: CreateBlogInput = await c.req.json();
        const parsedInput = createBlogInput.safeParse(body);
        if (!parsedInput.success) {
            c.status(400);
            return c.json({ message: "Invalid input!!!", details: parsedInput.error.issues });
        };
        const blogData = await prisma.blog.create({
            data: {
                title: body.title,
                excerpt: body.excerpt,
                content: body.content,
                authorId: userId,
            },
        });
        c.set("blogCount", await prisma.blog.count());
        return c.json({ message: "Successfully created the blog!!!", blogData });
    }
    catch (error) {
        return c.json(handleError(error, c));
    }
});

// PATCH /:id - update blog (only if user is author)
blogRouter.patch("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const userId = c.get("userId");
        const prisma = initPrisma(c);
        const body: UpdateBlogInput = await c.req.json();
        const parsedInput = updateBlogInput.safeParse(body);
        if (!parsedInput.success) {
            c.status(400);
            return c.json({ message: "Invalid input!!!", details: parsedInput.error.issues });
        };
        const blogData = await prisma.blog.update({
            where: {
                id,
                authorId: userId,
            },
            data: {
                ...(parsedInput.data.title && { title: parsedInput.data.title }),
                ...(parsedInput.data.excerpt && { excerpt: parsedInput.data.excerpt }),
                ...(parsedInput.data.content && { content: parsedInput.data.content }),
            }
        });
        return c.json({ message: "Successfully updated the blog!!!", blogData });
    }
    catch (error) {
        return c.json(handleError(error, c));
    }
});

// DELETE /:id - delete blog (only if user is author)
blogRouter.delete("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const userId = c.get("userId");
        const prisma = initPrisma(c);
        await prisma.blog.delete({
            where: {
                id,
                authorId: userId,
            },
        });
        c.set("blogCount", await prisma.blog.count());
        return c.json({ message: "Successfully deleted the blog!!!" });
    }
    catch (error) {
        return c.json(handleError(error, c));
    }
});