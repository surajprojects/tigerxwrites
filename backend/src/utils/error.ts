import { MyContext } from "./init";

export function handleError(error: unknown, c: MyContext) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as any).code === "string"
  ) {
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
