import { createContext } from "react";
import type { Blogs } from "../utils/types/blog";

export const BlogStreamContext = createContext<Blogs>([]);
