import Btn from "../button/btn";
import { useState, type ChangeEvent } from "react";
import type { CreateBlogInput, UpdateBlogInput } from "@tigerxinsights/tigerxwrites";

export default function BlogForm({
  handleSubmit,
  handleEditSubmit,
  isEdit = false,
  title = "Create a New Story",
  btnTitle = "Publish Story",
  initialData = {
    title: "",
    excerpt: "",
    content: "",
  },
}: {
  handleSubmit?: (formData: CreateBlogInput) => Promise<boolean>;
  handleEditSubmit?: (formData: UpdateBlogInput) => Promise<boolean>;
  isEdit?: boolean;
  title?: string;
  btnTitle?: string;
  initialData?: CreateBlogInput;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialData);
  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          setIsLoading(true);
          evt.preventDefault();
          if (isEdit && handleEditSubmit) {
            await handleEditSubmit(formData);
          } else {
            handleSubmit && (await handleSubmit(formData as CreateBlogInput));
          }
          setIsLoading(false);
        }}
        className="w-full md:w-3xl mx-auto rounded-lg border border-[#ebe6e0] shadow-xs p-6"
      >
        <h3 className="font-bold text-3xl text-[#2a2522]">{title}</h3>
        {/* Title */}
        <div className="flex flex-col my-6">
          <label htmlFor="title" className="font-sans font-medium text-sm text-[#2a2522]">
            Title
          </label>
          <input
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your story title..."
            required
            className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-md px-3 py-2 my-2 text-sm outline-none focus-within:ring-orange-500 focus-within:ring-2 focus-within:ring-offset-2 transition duration-75 ease-out"
          />
        </div>
        {/* Excerpt */}
        <div className="flex flex-col my-6">
          <label htmlFor="excerpt" className="font-sans font-medium text-sm text-[#2a2522]">
            Excerpt
          </label>
          <textarea
            name="excerpt"
            id="excerpt"
            onChange={handleChange}
            value={formData.excerpt}
            placeholder="Write a brief summary of your story..."
            required
            className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-md px-3 py-2 my-2 text-sm outline-none focus-within:ring-orange-500 focus-within:ring-2 focus-within:ring-offset-2 transition duration-75 ease-out min-h-20"
          ></textarea>
          <p className="text-sm font-sans text-[#7c706a]">
            This will appear in blog listing and previews
          </p>
        </div>
        {/* Content */}
        <div className="flex flex-col my-6">
          <label htmlFor="content" className="font-sans font-medium text-sm text-[#2a2522]">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            onChange={handleChange}
            value={formData.content}
            placeholder="Share your story with the world..."
            required
            className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-md px-3 py-2 my-2 text-sm outline-none focus-within:ring-orange-500 focus-within:ring-2 focus-within:ring-offset-2 transition duration-75 ease-out min-h-72"
          ></textarea>
        </div>
        <Btn btnType="submit" text={btnTitle} isLoading={isLoading} btnDisabled={isLoading} />
      </form>
    </>
  );
}
