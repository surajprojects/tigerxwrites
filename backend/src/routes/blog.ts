import { Hono } from "hono";
import { initPrisma } from "../utils/db";
import { Bindings, Variables } from "../utils/init";
import { blogAuth } from "../middlewares/blogAuth";
import { createBlogInput, CreateBlogInput, updateBlogInput, UpdateBlogInput } from "@tigerxinsights/tigerwrites";

// Blog router (handles CRUD for blogs)
export const blogRouter = new Hono<{ Bindings: Bindings, Variables: Variables }>();

// GET /bulk - fetch all blogs
blogRouter.get("/bulk", async (c) => {
    try {
        const prisma = initPrisma(c);
        const bulkBlogs = await prisma.blog.findMany({});
        if (bulkBlogs.length < 1) {
            c.status(404);
            return c.json({ message: "Blogs not found!!!" });
        };
        return c.json({ message: "Successfully found all blogs!!!", bulkBlogs });
    }
    catch (error) {
        c.status(500);
        return c.json({ message: "Internal Server Error!!!" });
    }
});

// GET /:id - fetch single blog by id
blogRouter.get("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const prisma = initPrisma(c);
        const blogData = await prisma.blog.findUnique({
            where: { id }
        });
        if (!blogData) {
            c.status(404);
            return c.json({ message: "Blog not found!!!" });
        };
        return c.json({ message: "Successfully found the blog!!!", blogData });
    }
    catch (error) {
        c.status(500);
        return c.json({ message: "Internal Server Error!!!" });
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
                content: body.content,
                authorId: userId,
            }
        });
        return c.json({ message: "Successfully created the blog!!!", blogData });
    }
    catch (error) {
        c.status(500);
        return c.json({ message: "Internal Server Error!!!" });
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
                ...(parsedInput.data.content && { content: parsedInput.data.content }),
            }
        });
        return c.json({ message: "Successfully updated the blog!!!", blogData });
    }
    catch (error) {
        if (typeof error === "object" &&
            error !== null &&
            "code" in error &&
            typeof (error as any).code === "string" &&
            error.code === "P2025"
        ) {
            c.status(404);
            return c.json({ message: "Blog not found!!!" });
        }
        c.status(500);
        return c.json({ message: "Internal Server Error!!!" });
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
        return c.json({ message: "Successfully deleted the blog!!!" });
    }
    catch (error) {
        if (typeof error === "object" &&
            error !== null &&
            "code" in error &&
            typeof (error as any).code === "string" &&
            error.code === "P2025"
        ) {
            c.status(404);
            return c.json({ message: "Blog not found!!!" });
        }
        c.status(500);
        return c.json({ message: "Internal Server Error!!!" });
    }
});