import { createContext } from "react";
import type { Blogs } from "../types/blog";

export const BlogStreamContext = createContext<Blogs>([]);
