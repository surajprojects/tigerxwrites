import { handleError } from "../../src/utils/error";
import type { MyContext } from "../../src/utils/init";
import { describe, it, expect, vi, beforeEach } from "vitest";

function createMockContext() {
  return {
    status: vi.fn(),
    json: vi.fn((data) => data),
  } as unknown as MyContext;
}

describe("Handle Error (unit)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return 404 for Prisma P2025", () => {
    const c = createMockContext();
    const error = { code: "P2025" };
    const result = handleError(error, c);
    expect(c.status).toHaveBeenCalledWith(404);
    expect(c.json).toHaveBeenCalledWith({ message: "Not found!!!" });
    expect(result).toEqual({ message: "Not found!!!" });
  });

  it("should return 400 for Prisma P2002", () => {
    const c = createMockContext();
    const error = { code: "P2002" };
    const result = handleError(error, c);
    expect(c.status).toHaveBeenCalledWith(400);
    expect(c.json).toHaveBeenCalledWith({ message: "Must be unique!!!" });
    expect(result).toEqual({ message: "Must be unique!!!" });
  });

  it("should return 500 for unknown error", () => {
    const c = createMockContext();
    const error = new Error("Something bad");
    const result = handleError(error, c);
    expect(c.status).toHaveBeenCalledWith(500);
    expect(c.json).toHaveBeenCalledWith({ message: "Internal Server Error!!!" });
    expect(result).toEqual({ message: "Internal Server Error!!!" });
  });

  it("should return 500 when error is not object / no code", () => {
    const c = createMockContext();
    const error = "random string error";
    const result = handleError(error, c);
    expect(c.status).toHaveBeenCalledWith(500);
    expect(c.json).toHaveBeenCalledWith({ message: "Internal Server Error!!!" });
    expect(result).toEqual({ message: "Internal Server Error!!!" });
  });
});
