import type { MyContext } from "../../src/utils/init";
import { blogAuth } from "../../src/middlewares/blogAuth";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("hono/cookie", () => ({
  getCookie: vi.fn(),
}));

vi.mock("hono/jwt", () => ({
  verify: vi.fn(),
}));

import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

type JwtPayload = {
  id?: string;
};

function createMockContext() {
  return {
    env: { JWT_SECRET: "jwt_secret" },
    status: vi.fn(),
    json: vi.fn((data) => data),
    set: vi.fn(),
  } as unknown as MyContext;
}

describe("blogAuth middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return 403 if token missing", async () => {
    const c = createMockContext();
    const next = vi.fn();

    vi.mocked(getCookie).mockReturnValue(undefined);

    const result = await blogAuth(c, next);

    expect(c.status).toHaveBeenCalledWith(403);
    expect(c.json).toHaveBeenCalledWith({ message: "Unauthorized!!!" });
    expect(next).not.toHaveBeenCalled();
    expect(result).toEqual({ message: "Unauthorized!!!" });
  });

  it("should return 403 if token invalid", async () => {
    const c = createMockContext();
    const next = vi.fn();

    vi.mocked(getCookie).mockReturnValue("token_123");
    vi.mocked(verify).mockResolvedValue({} as JwtPayload);

    await blogAuth(c, next);

    expect(c.status).toHaveBeenCalledWith(403);
  });

  it("should set userId and call next() if token valid", async () => {
    const c = createMockContext();
    const next = vi.fn().mockResolvedValue(undefined);

    vi.mocked(getCookie).mockReturnValue("token_123");
    vi.mocked(verify).mockResolvedValue({ id: "user_1" } as JwtPayload);

    await blogAuth(c, next);

    expect(c.set).toHaveBeenCalledWith("userId", "user_1");
    expect(next).toHaveBeenCalled();
  });

  it("should return 500 if verify throws", async () => {
    const c = createMockContext();
    const next = vi.fn();

    vi.mocked(getCookie).mockReturnValue("token_123");
    vi.mocked(verify).mockRejectedValue(new Error("jwt error"));

    const result = await blogAuth(c, next);

    expect(c.status).toHaveBeenCalledWith(500);
    expect(result).toEqual({ message: "Internal Server Error!!!" });
  });
});
