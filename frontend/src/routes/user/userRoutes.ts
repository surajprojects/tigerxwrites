import SignIn from "../../components/user/SignIn";
import SignUp from "../../components/user/SignUp";
import type { RouteObject } from "react-router-dom";

export const userRoutes: RouteObject[] = [
    { path: "signin", Component: SignIn },
    { path: "signup", Component: SignUp },
];