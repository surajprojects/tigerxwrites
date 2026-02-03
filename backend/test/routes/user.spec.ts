import { Hono } from "hono";
import { userRouter } from "../../src/routes/user";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Bindings, Variables } from "../../src/utils/init";

/* ---------------- MOCKS ---------------- */

vi.mock("../../src/utils/db", () => ({
  initPrisma: vi.fn(),
}));

vi.mock("bcryptjs", () => ({
  default: {
    hashSync: vi.fn(),
    compare: vi.fn(),
  },
}));

vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn(),
  },
}));

vi.mock("hono/cookie", () => ({
  setCookie: vi.fn(),
  deleteCookie: vi.fn(),
}));

vi.mock("../../src/middlewares/verifyCaptcha", () => ({
  verifyCaptcha: async (_c: unknown, next: () => Promise<void>) => next(),
}));

vi.mock("../../src/middlewares/blogAuth", () => ({
  blogAuth: async (c: { set: (k: string, v: string) => void }, next: () => Promise<void>) => {
    c.set("userId", "user_123");
    await next();
  },
}));

vi.mock("@tigerxinsights/tigerxwrites", () => ({
  signUpInput: { safeParse: vi.fn() },
  signInInput: { safeParse: vi.fn() },
}));

/* ---------------- IMPORT AFTER MOCK ---------------- */

import bcrypt from "bcryptjs";
import jwtLib from "jsonwebtoken";
import { initPrisma } from "../../src/utils/db";
import { setCookie, deleteCookie } from "hono/cookie";
import { signUpInput, signInInput } from "@tigerxinsights/tigerxwrites";

/* ---------------- APP SETUP ---------------- */

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();
app.route("/api/v1/user", userRouter);

const env = { JWT_SECRET: "jwt_secret" };

/* ---------------- TESTS ---------------- */

describe("User Router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("GET /me should return authenticated user", async () => {
    const res = await app.request("/api/v1/user/me", {}, env);
    const body = (await res.json()) as { message: string; userId: string };

    expect(res.status).toBe(200);
    expect(body.userId).toBe("user_123");
  });

  it("GET /signout should clear cookie", async () => {
    const res = await app.request("/api/v1/user/signout", {}, env);
    const body = (await res.json()) as { message: string };

    expect(deleteCookie).toHaveBeenCalledWith(expect.anything(), "token", { path: "/api/v1" });
    expect(body.message).toBe("Signout successful!!!");
  });

  it("POST /signup should create user", async () => {
    const prismaMock = { user: { create: vi.fn().mockResolvedValue({ id: "user_1" }) } };
    vi.mocked(initPrisma).mockReturnValue(prismaMock as never);

    vi.mocked(signUpInput.safeParse).mockReturnValue({
      success: true,
      data: { name: "Tiger", email: "a@a.com", password: "pass" },
    });

    vi.mocked(bcrypt.hashSync).mockReturnValue("hashed_pass");
    vi.mocked(jwtLib.sign).mockReturnValue("jwt_token" as never);

    const res = await app.request(
      "/api/v1/user/signup",
      {
        method: "POST",
        body: JSON.stringify({
          name: "Tiger",
          email: "a@a.com",
          password: "pass",
          captchaToken: "t",
        }),
        headers: { "Content-Type": "application/json" },
      },
      env,
    );

    expect(setCookie).toHaveBeenCalled();
    expect(res.status).toBe(201);
  });

  it("POST /signup should fail validation", async () => {
    vi.mocked(signUpInput.safeParse).mockReturnValue({
      success: false,
      error: { issues: [] } as never,
    });

    const res = await app.request(
      "/api/v1/user/signup",
      { method: "POST", body: JSON.stringify({}), headers: { "Content-Type": "application/json" } },
      env,
    );

    expect(res.status).toBe(400);
  });

  it("POST /signin success", async () => {
    const prismaMock = {
      user: { findUnique: vi.fn().mockResolvedValue({ id: "user_1", password: "hashed_pass" }) },
    };

    vi.mocked(initPrisma).mockReturnValue(prismaMock as never);
    vi.mocked(signInInput.safeParse).mockReturnValue({
      success: true,
      data: { email: "a@a.com", password: "pass" },
    } as never);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
    vi.mocked(jwtLib.sign).mockReturnValue("jwt_token" as never);

    const res = await app.request(
      "/api/v1/user/signin",
      {
        method: "POST",
        body: JSON.stringify({ email: "a@a.com", password: "pass" }),
        headers: { "Content-Type": "application/json" },
      },
      env,
    );

    expect(setCookie).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  it("POST /signin wrong password", async () => {
    const prismaMock = {
      user: { findUnique: vi.fn().mockResolvedValue({ id: "user_1", password: "hashed_pass" }) },
    };

    vi.mocked(initPrisma).mockReturnValue(prismaMock as never);
    vi.mocked(signInInput.safeParse).mockReturnValue({
      success: true,
      data: { email: "a@a.com", password: "wrong" },
    } as never);
    vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

    const res = await app.request(
      "/api/v1/user/signin",
      {
        method: "POST",
        body: JSON.stringify({ email: "a@a.com", password: "wrong" }),
        headers: { "Content-Type": "application/json" },
      },
      env,
    );

    expect(res.status).toBe(401);
  });
});
