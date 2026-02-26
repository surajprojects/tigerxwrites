import { useContext } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { UserDataContext } from "../../store/userContext";
import { errorHandle } from "../../utils/errors/errorHandle";

export default function SignOutBtn() {
  const userData = useContext(UserDataContext);
  const handleSignOut = async () => {
    try {
      await axiosInstance.get("/user/signout");
      userData?.setUserData({
        id: "",
        name: "",
        email: "",
        bio: "",
      });
      toast.success("Sign Out successfull!!!");
    } catch (error) {
      errorHandle(error);
    }
  };
  return (
    <>
      <button onClick={handleSignOut} className="cursor-pointer">
        Sign Out
      </button>
    </>
  );
}
