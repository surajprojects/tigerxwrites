import { useContext } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import type { User } from "../../utils/types/user";
import { UserDataContext } from "../../store/userContext";
import SignUpForm from "../../components/user/SignUpForm";
import { errorHandle } from "../../utils/errors/errorHandle";
import type { SignUpInput } from "@tigerxinsights/tigerxwrites";

export default function SignUp() {
  const navigate = useNavigate();
  const userData = useContext(UserDataContext);

  const handleSubmit = async (formData: SignUpInput, captchaToken: string | undefined) => {
    try {
      const result = await axiosInstance.post("user/signup", { ...formData, captchaToken });
      const currentUserData: User = result.data.userData;
      userData?.setUserData(currentUserData);
      navigate("/blogs");
      toast.success("Sign Up successfull!!!");
      return true;
    } catch (error) {
      errorHandle(error);
      return false;
    }
  };
  return (
    <>
      <section className="w-screen flex justify-center items-center">
        <SignUpForm handleSubmit={handleSubmit} />
      </section>
    </>
  );
}
