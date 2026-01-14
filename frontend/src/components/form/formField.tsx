import type { ChangeEvent } from "react";

export default function FormField({
    id = "name",
    title = "Name",
    isRequired = true,
    fieldType = "text",
    isTextHolder = true,
    textHolder = "Enter your name",
    fieldValue,
    showMessage = false,
    isSuccess = true,
    msgSuccess = "Alright! Username available!",
    msgError = "Oops! Username already taken!",
    children,
    onChangeFunc,
}: {
    id?: string,
    title?: string,
    isRequired?: boolean,
    fieldType?: string,
    isTextHolder?: boolean,
    textHolder?: string,
    fieldValue: string,
    showMessage?: boolean,
    isSuccess?: boolean,
    msgSuccess?: string,
    msgError?: string,
    children?: React.ReactNode,
    onChangeFunc: (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
}) {
    return (
        <>
            {
                isTextHolder ?
                    <div className="flex flex-col my-3">
                        <label htmlFor={id} className="font-sans font-medium text-sm text-[#2a2522]">{title}</label>
                        <div className="flex border border-gray-300 font-sans font-normal text-[#2a2522] rounded-md px-3 py-2 my-2 text-sm focus:outline-orange-500 focus:outline-2 focus:outline-offset-2 duration-75 ease-out">
                            <input
                                type={fieldType}
                                name={id}
                                id={id}
                                value={fieldValue}
                                onChange={onChangeFunc}
                                placeholder={textHolder}
                                required={isRequired}
                                className="grow outline-none"
                            />
                            {children}
                        </div>
                        {showMessage && (isSuccess ?
                            <p className="mt-2 text-sm text-green-600 dark:text-green-500">{msgSuccess}</p>
                            :
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{msgError}</p>)
                        }
                    </div>
                    :
                    <div className="flex flex-col my-3">
                        <label htmlFor={id} className="font-sans font-medium text-sm text-[#2a2522]">{title}</label>
                        <input
                            type={fieldType}
                            name={id}
                            id={id}
                            value={fieldValue}
                            onChange={onChangeFunc}
                            required={isRequired}
                            className="border border-gray-300 rounded-md font-sans font-normal text-[#2a2522] px-3 py-2 my-2 text-sm focus:outline-orange-500 focus:outline-2 focus:outline-offset-2 duration-75 ease-out"
                        />
                        {showMessage && (isSuccess ?
                            <p className="mt-2 text-sm text-green-600 dark:text-green-500">{msgSuccess}</p>
                            :
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{msgError}</p>)
                        }
                    </div>
            }
        </>
    );
};
