import type { ChangeEvent } from "react";

export default function FormField({
    id = "name",
    title = "Name",
    isRequired = true,
    fieldType = "text",
    isTextHolder = true,
    textHolder = "Enter your name",
    fieldValue,
    onChangeFunc,
}: {
    id?: string,
    title?: string,
    isRequired?: boolean,
    fieldType?: string,
    isTextHolder?: boolean,
    textHolder?: string,
    fieldValue: string,
    onChangeFunc: (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
}) {
    return (
        <>
            {
                isTextHolder ?
                    <div className="flex flex-col my-1 sm:my-2">
                        <label htmlFor={id} className="font-semibold text-sm sm:text-base">{title}</label>
                        <input
                            type={fieldType}
                            name={id}
                            id={id}
                            value={fieldValue}
                            onChange={onChangeFunc}
                            placeholder={textHolder}
                            required={isRequired}
                            className="border border-gray-300 rounded-md px-2 sm:px-3 py-1 sm:py-2 my-2 text-sm"
                        />
                    </div>
                    :
                    <div className="flex flex-col my-2">
                        <label htmlFor={id} className="font-semibold">{title}</label>
                        <input
                            type={fieldType}
                            name={id}
                            id={id}
                            value={fieldValue}
                            onChange={onChangeFunc}
                            required={isRequired}
                            className="border border-gray-300 rounded-md px-3 py-2 my-2"
                        />
                    </div>
            }
        </>
    );
};
