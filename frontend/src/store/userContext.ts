import { createContext } from "react";
import type { User } from "../utils/types/user";

type UserDataContextType = {
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
};

export const UserDataContext = createContext<UserDataContextType | null>(null);
