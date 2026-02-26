import { Context } from "hono";

/**
 * Environment bindings injected by the runtime
 * e.g. secrets, database connection strings, etc.
 */
export type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
  SECRET_KEY: string;
  CLIENT_URL: string;
  MY_RATE_LIMITER: RateLimit;
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
};

/**
 * Custom variables we store in context during request lifecycle
 * e.g. userId added after authentication
 */
export type Variables = {
  blogCount: number;
  userData: {
    id: string;
    name: string;
    email: string;
    bio: string | null;
  };
};

/**
 * Strongly typed Hono context
 * - Includes our custom Bindings (env) and Variables (runtime state)
 */
export type MyContext = Context<{ Bindings: Bindings; Variables: Variables }>;
