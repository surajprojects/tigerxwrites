import axiosInstance from "../../utils/axios";
import SignUpForm from "../../components/user/SignUpForm";
import type { SignUpInput } from "@tigerxinsights/tigerxwrites";
import Quote from "../../components/home/quote";

export default function SignUp() {
    const handleSubmit = async (formData: SignUpInput) => {
        try {
            const result = await axiosInstance.post("/user/signup", formData);
            console.log(result)
            return true;
        } catch (error) {
            return false;
        }
    };
    return (
        <>
            <section className="flex">
                <SignUpForm handleSubmit={handleSubmit} />
                <Quote />
            </section>
        </>
    );
};