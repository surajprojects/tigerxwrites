import Btn from "../common/btn";
import FormTitle from "../common/form/formTitle";
import FormField from "../common/form/formField";
import { useState, type ChangeEvent } from "react";
import FormDescription from "../common/form/formDescription";
import type { SignUpInput } from "@tigerxinsights/tigerxwrites";

export default function SignUpForm({
    handleSubmit
}: {
    handleSubmit: (data: SignUpInput) => Promise<boolean>
}) {
    const initialData = {
        name: "",
        email: "",
        password: "",
    };

    const [formData, setFormData] = useState<SignUpInput>(initialData);

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
            <section className="w-screen h-screen flex flex-col justify-center items-center">
                <FormTitle text="Create an account" />
                <FormDescription text="Already have an account?" linkTo="/signin" linkName="Sign In" />
                {/* Sign Up Form */}
                <form onSubmit={async (evt) => {
                    evt.preventDefault();
                    const result = await handleSubmit(formData);
                    if (result) {

                    }
                    else {

                    }
                }}
                    className="w-72 sm:w-96 my-3"
                >
                    {/* Name */}
                    <FormField
                        id="name"
                        title="Name"
                        textHolder="Enter name"
                        fieldValue={formData.name}
                        onChangeFunc={handleChange}
                    />
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
                    <Btn btnType="submit" text="Sign Up" />
                </form>
            </section>
        </>
    );
};