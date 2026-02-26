import { useContext } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import type { User } from "../../utils/types/user";
import { UserDataContext } from "../../store/userContext";
import SignInForm from "../../components/user/SignInForm";
import { errorHandle } from "../../utils/errors/errorHandle";
import type { SignInInput } from "@tigerxinsights/tigerxwrites";

export default function SignIn() {
  const navigate = useNavigate();
  const userData = useContext(UserDataContext);

  const handleSubmit = async (formData: SignInInput) => {
    try {
      const result = await axiosInstance.post("/user/signin", formData);
      const currentUserData: User = result.data.userData;
      userData?.setUserData(currentUserData);
      navigate("/blogs");
      toast.success("Sign In successfull!!!");
      return true;
    } catch (error) {
      errorHandle(error);
      return false;
    }
  };
  return (
    <>
      <section className="w-screen flex justify-center items-center">
        <SignInForm handleSubmit={handleSubmit} />
      </section>
    </>
  );
}
