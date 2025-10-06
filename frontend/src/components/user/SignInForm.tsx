import Btn from "../common/btn";
import FormTitle from "../common/form/formTitle";
import FormField from "../common/form/formField";
import { useState, type ChangeEvent } from "react";
import FormDescription from "../common/form/formDescription";
import type { SignInInput } from "@tigerxinsights/tigerxwrites";

export default function SignInForm({
    handleSubmit
}: {
    handleSubmit: (data: SignInInput) => Promise<boolean>
}) {
    const initialData = {
        email: "",
        password: "",
    };

    const [formData, setFormData] = useState<SignInInput>(initialData);

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
            <section className="w-screen h-screen flex flex-col justify-center items-center">
                <FormTitle text="Sign In" />
                <FormDescription text="Create an account" linkTo="/signup" linkName="Sign Up" />
                {/* Sign In Form */}
                <form onSubmit={async (evt) => {
                    evt.preventDefault();
                    const result = await handleSubmit(formData);
                    if (result) {
                        setFormData(initialData);
                    }
                    else {
                        console.log("Network Error!!!");
                    }
                }}
                    className="w-72 sm:w-96 my-3"
                >
                    {/* Email */}
                    <FormField
                        id="email"
                        title="Email"
                        fieldType="email"
                        textHolder="Enter email"
                        fieldValue={formData.email}
                        onChangeFunc={handleChange}
                    />
                    {/* Password */}
                    <FormField
                        id="password"
                        title="Password"
                        fieldType="password"
                        textHolder="Enter password"
                        fieldValue={formData.password}
                        onChangeFunc={handleChange}
                    />
                    {/* Button */}
                    <Btn btnType="submit" text="Sign In" />
                </form>
            </section >
        </>
    );
};