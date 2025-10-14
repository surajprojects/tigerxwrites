import type { User } from "./user";

export interface Blog {
    id: string,
    title: string,
    content: string,
    excerpt: string,
    published: boolean,
    authorId: string,
    author: User,
    createdAt: string,
    updatedAt: string,
};

export type Blogs = Blog[];

export type BlogData = Pick<Blog, "id" | "title" | "content" | "excerpt"> & {
    postedOn: string;
    authorName: string;
    authorBio?: string;
};