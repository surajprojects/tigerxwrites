import { Context } from "hono";

/**
 * Environment bindings injected by the runtime
 * e.g. secrets, database connection strings, etc.
 */
export type Bindings = {
    DATABASE_URL: string;
    JWT_SECRET: string;
};

/**
 * Custom variables we store in context during request lifecycle
 * e.g. userId added after authentication
 */
export type Variables = {
    userId: string;
    blogCount: number;
};

/**
 * Strongly typed Hono context
 * - Includes our custom Bindings (env) and Variables (runtime state)
 */
export type MyContext = Context<{ Bindings: Bindings; Variables: Variables }>;