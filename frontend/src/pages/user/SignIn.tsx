import axiosInstance from "../../utils/axios";
import SignInForm from "../../components/user/SignInForm";
import type { SignInInput } from "@tigerxinsights/tigerxwrites";
import Quote from "../../components/home/quote";

export default function SignIn() {
    const handleSubmit = async (formData: SignInInput) => {
        try {
            const result = await axiosInstance.post("/user/signin", formData);
            console.log(result)
            return true;
        } catch (error) {
            return false;
        }
    };
    return (
        <>
            <section className="flex">
                <SignInForm handleSubmit={handleSubmit} />
                <Quote />
            </section>
        </>
    );
};