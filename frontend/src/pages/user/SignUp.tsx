import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/user/SignUpForm";
import { errorHandle } from "../../utils/errors/errorHandle";
import type { SignUpInput } from "@tigerxinsights/tigerxwrites";

export default function SignUp() {
    const navigate = useNavigate();
    const handleSubmit = async (formData: SignUpInput, captchaToken: string | undefined) => {
        try {
            await axiosInstance.post("user/signup", { ...formData, captchaToken });
            navigate("/blogs");
            toast.success("Sign Up successfull!!!");
        } catch (error) {
            errorHandle(error);
        } finally {
            return true;
        }
    };
    return (
        <>
            <section className="w-screen flex justify-center items-center">
                <SignUpForm handleSubmit={handleSubmit} />
            </section>
        </>
    );
};