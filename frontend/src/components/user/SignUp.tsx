import { useState, type ChangeEvent, type FormEvent } from "react";
import type { SignUpInput } from "@tigerxinsights/tigerwrites";
import axiosInstance from "../../utils/axios";

export default function SignUp() {
    const initialData = {
        name: "",
        email: "",
        password: "",
    };
    const [formData, setFormData] = useState<SignUpInput>(initialData);

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
        const result = await axiosInstance.post("/user/signup", formData);
        console.log(result);
    };

    return (
        <>
            <section>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="name"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter name" />
                    </div>
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