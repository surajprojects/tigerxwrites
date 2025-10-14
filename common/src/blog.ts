import z from "zod";

export const createBlogInput = z.object({
    title: z.string(),
    excerpt: z.string(),
    content: z.string(),
}).strict();

export type CreateBlogInput = z.infer<typeof createBlogInput>;

export const updateBlogInput = createBlogInput.partial().strict();

export type UpdateBlogInput = z.infer<typeof updateBlogInput>;