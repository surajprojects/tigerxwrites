import Btn from "../button/btn";
import FormField from "../form/formField";
import FormHeader from "../form/formHeader";
import FormAction from "../form/formAction";
import { useState, type ChangeEvent } from "react";
import type { SignInInput } from "@tigerxinsights/tigerxwrites";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function SignInForm({
    handleSubmit
}: {
    handleSubmit: (data: SignInInput) => Promise<boolean>
}) {
    const initialData = {
        email: "",
        password: "",
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<SignInInput>(initialData);
    const [showPassword, setShowPassword] = useState<boolean>(false);


    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = evt.target.name;
        const fieldValue = evt.target.value;

        setFormData((prevData) => {
            return {
                ...prevData,
                [fieldName]: fieldValue
            };
        });
    };

    return (
        <>
            <section className="bg-white w-full h-full p-5">
                <div className="rounded-lg border border-[#ebe6e0] p-6 my-40 w-fit mx-auto shadow-xs">
                    <FormHeader />
                    {/* Sign In Form */}
                    <form onSubmit={async (evt) => {
                        setIsLoading(true);
                        evt.preventDefault();
                        await handleSubmit(formData);
                        setIsLoading(false);
                    }}
                        className="max-w-sm sm:w-sm mt-8"
                    >
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
                            textHolder="••••••••"
                            fieldValue={formData.password}
                            fieldType={showPassword ? "text" : "password"}
                            onChangeFunc={handleChange}
                        >
                            <button
                                type="button"
                                onClick={() => setShowPassword((prevData) => !prevData)}
                                className="inline px-0.5 cursor-pointer"
                            >
                                {showPassword ? <EyeIcon className="size-4" /> : <EyeSlashIcon className="size-4" />}
                            </button>
                        </FormField>
                        {/* Button */}
                        <Btn btnType="submit" text="Sign In" isLoading={isLoading} btnDisabled={isLoading} />
                        <div className="flex justify-center items-center mt-2">
                            <FormAction linkTo="/signup" />
                        </div>
                    </form>
                </div>
            </section >
        </>
    );
};