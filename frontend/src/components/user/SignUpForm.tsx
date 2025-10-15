import Btn from "../button/btn";
import FormField from "../form/formField";
import FormHeader from "../form/formHeader";
import FormAction from "../form/formAction";
import { useState, type ChangeEvent } from "react";
import type { SignUpInput } from "@tigerxinsights/tigerxwrites";

export type SignUpFormInput = Pick<SignUpInput, "email" | "name" | "password"> & { confirmPassword: string };

export default function SignUpForm({
    handleSubmit
}: {
    handleSubmit: (data: SignUpInput) => Promise<boolean>
}) {
    const initialData = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [formData, setFormData] = useState<SignUpFormInput>(initialData);

    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = evt.target.name;
        const fieldValue = evt.target.value;

        setFormData((prevData) => {
            return {
                ...prevData,
                [fieldName]: fieldValue,
            };
        });
    };

    return (
        <>
            <section className="bg-white w-full h-full p-5">
                <div className="rounded-lg border border-[#ebe6e0] p-6 my-40 w-fit mx-auto shadow-xs">
                    <FormHeader
                        title="Create an account"
                        description="Join Tiger Writes and start sharing your stories"
                    />
                    {/* Sign Up Form */}
                    <form onSubmit={async (evt) => {
                        setIsLoading(true);
                        evt.preventDefault();
                        if (formData.password === formData.confirmPassword) {
                            setShowMessage(false);
                            const { confirmPassword, ...newFormData } = formData;
                            await handleSubmit(newFormData);
                        }
                        else {
                            setShowMessage(true);
                        }
                        setIsLoading(false);
                    }}
                        className="max-w-sm sm:w-sm mt-8"
                    >
                        {/* Name */}
                        <FormField
                            id="name"
                            title="Full Name"
                            textHolder="John Doe"
                            fieldValue={formData.name}
                            onChangeFunc={handleChange}
                        />
                        {/* Email */}
                        <FormField
                            id="email"
                            title="Email"
                            fieldType="email"
                            textHolder="your@email.com"
                            fieldValue={formData.email}
                            onChangeFunc={handleChange}
                        />
                        {/* Password */}
                        <FormField
                            id="password"
                            title="Password"
                            fieldType="password"
                            textHolder="••••••••"
                            fieldValue={formData.password}
                            onChangeFunc={handleChange}
                        />
                        {/* Confirm Password */}
                        <FormField
                            id="confirmPassword"
                            title="Confirm Password"
                            fieldType="password"
                            textHolder="••••••••"
                            fieldValue={formData.confirmPassword}
                            onChangeFunc={handleChange}
                            showMessage={showMessage}
                            isSuccess={false}
                            msgError="Password doesn't match!"
                        />
                        {/* Button */}
                        <Btn btnType="submit" text="Create Account" isLoading={isLoading} btnDisabled={isLoading} />
                        <div className="flex justify-center items-center mt-2">
                            <FormAction
                                linkTo="/signin"
                                linkName="Sign in"
                                text="Already have an account?"
                            />
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};