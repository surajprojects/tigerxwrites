import Spinner from "../ui/spinner";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import type { User } from "../../utils/types/user";
import { UserDataContext } from "../../store/userContext";

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>({
    id: "",
    name: "",
    email: "",
    bio: "",
  });

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const result = await axiosInstance.get("user/me");
        const data: User = result.data.userData;
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      <UserDataContext value={{ userData, setUserData }}>
        {isLoading ? <Spinner /> : <div>{children}</div>}
      </UserDataContext>
    </>
  );
}
