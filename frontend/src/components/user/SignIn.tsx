import { useState, type ChangeEvent, type FormEvent } from "react";
import type { SignInInput } from "@tigerxinsights/tigerwrites";
import axiosInstance from "../../utils/axios";

export default function SignIn() {
    const initialData = {
        email: "",
        password: "",
    };
    const [formData, setFormData] = useState<SignInInput>(initialData);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const fieldName = evt.target.name;
        const fieldValue = evt.target.value;

        setFormData((prevData) => {
            return {
                ...prevData,
                [fieldName]: fieldValue
            };
        });
    };

    const handleSubmit = async (evt: FormEvent) => {
        evt.preventDefault();
        const result = await axiosInstance.post("/user/signin", formData);
        console.log(result);
    };

    return (
        <>
            <section>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </section>
        </>
    );
};