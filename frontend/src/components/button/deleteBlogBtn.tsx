import { useState } from "react";
import Spinner from "../ui/spinner";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { errorHandle } from "../../utils/errors/errorHandle";

export default function DeleteBlogBtn({ blogId = "#" }: { blogId?: string }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await axiosInstance.delete(`/blog/${blogId}`);
            navigate(0);
            toast.success("Blog deleted successfully!!!");
        } catch (error) {
            errorHandle(error);
        }
        setIsLoading(false);
    };
    return (
        <>
            <button
                disabled={isLoading}
                type="button"
                onClick={handleDelete}
                className="border rounded-md border-[#ebe6e0] font-sans text-sm font-semibold text-[#2a2522]  p-1.5 w-full mx-1 outline-none ease-out duration-300 hover:text-white hover:bg-red-500 hover:cursor-pointer flex justify-center items-center disabled:cursor-not-allowed"
            >{isLoading ? <div className="flex justify-center items-center w-full"><Spinner customize={true} /></div> : <><TrashIcon className="w-5 h-5 mr-1" />Delete</>}</button>
        </>
    );
};