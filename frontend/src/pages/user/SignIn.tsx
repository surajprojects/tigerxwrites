import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Quote from "../../components/home/quote";
import SignInForm from "../../components/user/SignInForm";
import { errorHandle } from "../../utils/errors/errorHandle";
import type { SignInInput } from "@tigerxinsights/tigerxwrites";

export default function SignIn() {
    const navigate = useNavigate();
    const handleSubmit = async (formData: SignInInput) => {
        try {
            await axiosInstance.post("/user/signin", formData);
            navigate("/blogs");
            toast.success("Sign In successfull!!!");
        } catch (error) {
            errorHandle(error);
        }
    };
    return (
        <>
            <section className="w-screen flex items-center">
                <SignInForm handleSubmit={handleSubmit} />
                <Quote />
            </section>
        </>
    );
};