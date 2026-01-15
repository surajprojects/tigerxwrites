import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { Bindings, Variables } from "./utils/init";

// Initialize Hono app with custom bindings/variables
const app = new Hono<{ Bindings: Bindings, Variables: Variables }>();

// Enable CORS for frontend
app.use("/api/*", async (c, next) => {
    const corsMiddlewareHandler = cors({
        origin: c.env.CLIENT_URL,
        credentials: true,
    });
    return corsMiddlewareHandler(c, next);
});

// Mount API routes
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;