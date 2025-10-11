import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Quote from "../../components/home/quote";
import SignUpForm from "../../components/user/SignUpForm";
import { errorHandle } from "../../utils/errors/errorHandle";
import type { SignUpInput } from "@tigerxinsights/tigerxwrites";

export default function SignUp() {
    const navigate = useNavigate();
    const handleSubmit = async (formData: SignUpInput) => {
        try {
            await axiosInstance.post("user/signup", formData);
            navigate("/blogs");
            toast.success("Sign Up successfull!!!");
        } catch (error) {
            errorHandle(error);
        }
    };
    return (
        <>
            <section className="w-screen flex items-center">
                <SignUpForm handleSubmit={handleSubmit} />
                <Quote />
            </section>
        </>
    );
};