import { MyContext } from "./init";

export type PrismaLikeError = {
  code: string;
};

export function isPrismaError(err: unknown): err is PrismaLikeError {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    typeof (err as { code?: unknown }).code === "string"
  );
}

export function handleError(error: unknown, c: MyContext) {
  if (isPrismaError(error)) {
    if (error.code === "P2025") {
      c.status(404);
      return c.json({ message: "Not found!!!" });
    } else if (error.code === "P2002") {
      c.status(400);
      return c.json({ message: "Must be unique!!!" });
    }
  }
  c.status(500);
  return c.json({ message: "Internal Server Error!!!" });
}
