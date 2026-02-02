import SignIn from "../../pages/user/SignIn";
import SignUp from "../../pages/user/SignUp";
import type { RouteObject } from "react-router-dom";

export const userRoutes: RouteObject[] = [
  { path: "signin", Component: SignIn },
  { path: "signup", Component: SignUp },
];
