import type { MyContext } from "../../src/utils/init";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { verifyCaptcha } from "../../src/middlewares/verifyCaptcha";

type FetchJson = {
  success: boolean;
};

function createMockContext({ captchaToken = "captchaToken", secretKey = "secretKey" } = {}) {
  return {
    env: { SECRET_KEY: secretKey },
    req: {
      json: vi.fn().mockResolvedValue({ captchaToken }),
    },
    status: vi.fn(),
    json: vi.fn((data) => data),
  } as unknown as MyContext;
}

describe("Verify captcha middleware (unit)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should call next() when captcha is valid", async () => {
    const c = createMockContext();
    const next = vi.fn().mockResolvedValue(undefined);

    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ success: true } satisfies FetchJson),
    });

    vi.stubGlobal("fetch", fetchMock);

    await verifyCaptcha(c, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(c.status).not.toHaveBeenCalled();
    expect(c.json).not.toHaveBeenCalled();
  });

  it("should return 500 when captcha fails", async () => {
    const c = createMockContext();
    const next = vi.fn();

    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ success: false } satisfies FetchJson),
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await verifyCaptcha(c, next);

    expect(next).not.toHaveBeenCalled();
    expect(c.status).toHaveBeenCalledWith(500);
    expect(c.json).toHaveBeenCalledWith({ message: "Internal Server Error!!!" });
    expect(result).toEqual({ message: "Internal Server Error!!!" });
  });

  it("should return 500 when fetch throws", async () => {
    const c = createMockContext();
    const next = vi.fn();

    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network fail")));

    const result = await verifyCaptcha(c, next);

    expect(next).not.toHaveBeenCalled();
    expect(c.status).toHaveBeenCalledWith(500);
    expect(result).toEqual({ message: "Internal Server Error!!!" });
  });

  it("should return 500 when captchaToken missing", async () => {
    const c = createMockContext();

    const jsonMock = c.req.json as unknown as Mock;
    jsonMock.mockResolvedValue({});

    const next = vi.fn();

    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ success: false } satisfies FetchJson),
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await verifyCaptcha(c, next);

    expect(next).not.toHaveBeenCalled();
    expect(c.status).toHaveBeenCalledWith(500);
    expect(result).toEqual({ message: "Internal Server Error!!!" });
  });
});
