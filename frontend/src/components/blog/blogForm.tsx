import { useNavigate } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import type { CreateBlogInput, UpdateBlogInput } from "@tigerxinsights/tigerxwrites";

export default function BlogForm({
    handleSubmit,
    handleEditSubmit,
    isEdit = false,
    initialData = {
        title: "",
        content: "",
    },
}: {
    handleSubmit?: (formData: CreateBlogInput) => void,
    handleEditSubmit?: (formData: UpdateBlogInput) => void,
    isEdit?: boolean,
    initialData?: CreateBlogInput,
}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateBlogInput>(initialData);
    const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
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
            <form
                onSubmit={async (evt) => {
                    evt.preventDefault();
                    if (isEdit && handleEditSubmit) {
                        handleEditSubmit(formData);
                    }
                    else {
                        handleSubmit && handleSubmit(formData as CreateBlogInput);
                    }
                }}
                className="max-w-3xl mx-auto mt-20 px-4">
                {/* Title */}
                <textarea
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full text-5xl font-serif font-medium resize-none placeholder-gray-400 focus:outline-none overflow-hidden border-none leading-relaxed max-h-[10vh] overflow-y-auto scrollbar-none"
                />
                {/* Content */}
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Tell your story..."
                    className="w-full mt-4 text-xl font-light resize-none placeholder-gray-400 focus:outline-none overflow-hidden border-none leading-relaxed min-h-[50vh] overflow-y-auto scrollbar-none"
                />
                {/* Button */}
                <button type="submit" className="rounded-md bg-green-500 text-white px-2 py-1 border border-green-700 hover:cursor-pointer shadow">Confirm</button>
                <button type="button" onClick={() => navigate(-1)} className="rounded-md bg-red-500 text-white px-2 py-1 border border-red-700 hover:cursor-pointer shadow mx-3">Cancel</button>
            </form >
        </>
    );
};