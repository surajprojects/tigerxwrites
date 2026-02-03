import Btn from "../button/btn";
import Turnstile from "react-turnstile";
import FormField from "../form/formField";
import FormHeader from "../form/formHeader";
import FormAction from "../form/formAction";
import { useState, type ChangeEvent } from "react";
import { VITE_SITE_KEY } from "../../../base.config";
import type { SignUpInput } from "@tigerxinsights/tigerxwrites";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export type SignUpFormInput = Pick<SignUpInput, "email" | "name" | "password"> & {
  confirmPassword: string;
};

export default function SignUpForm({
  handleSubmit,
}: {
  handleSubmit: (data: SignUpInput, captchaToken: string | undefined) => Promise<boolean>;
}) {
  const [captchaToken, setCaptchaToken] = useState<string | undefined>(undefined);
  const initialData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignUpFormInput>(initialData);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

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
          <form
            onSubmit={async (evt) => {
              setIsLoading(true);
              evt.preventDefault();
              if (formData.password === formData.confirmPassword) {
                setShowMessage(false);
                const { confirmPassword: _confirmPassword, ...newFormData } = formData;
                await handleSubmit(newFormData, captchaToken);
              } else {
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
              textHolder="••••••••"
              fieldType={showPassword ? "text" : "password"}
              fieldValue={formData.password}
              onChangeFunc={handleChange}
            >
              <button
                type="button"
                onClick={() => setShowPassword((prevData) => !prevData)}
                className="inline px-0.5 cursor-pointer"
              >
                {showPassword ? (
                  <EyeIcon className="size-4" />
                ) : (
                  <EyeSlashIcon className="size-4" />
                )}
              </button>
            </FormField>
            {/* Confirm Password */}
            <FormField
              id="confirmPassword"
              title="Confirm Password"
              fieldType={showConfirmPassword ? "text" : "password"}
              textHolder="••••••••"
              fieldValue={formData.confirmPassword}
              onChangeFunc={handleChange}
              showMessage={showMessage}
              isSuccess={false}
              msgError="Password doesn't match!"
            >
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prevData) => !prevData)}
                className="inline px-0.5 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeIcon className="size-4" />
                ) : (
                  <EyeSlashIcon className="size-4" />
                )}
              </button>
            </FormField>
            {/* Captcha */}
            <Turnstile
              className="flex justify-center mb-3"
              // sitekey={import.meta.env.VITE_SITE_KEY}
              sitekey={VITE_SITE_KEY}
              onSuccess={(captchaToken) => {
                setCaptchaToken(captchaToken);
              }}
            />
            {/* Button */}
            <Btn btnType="submit" text="Create Account" isLoading={isLoading} />
            <div className="flex justify-center items-center mt-2">
              <FormAction linkTo="/signin" linkName="Sign in" text="Already have an account?" />
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
