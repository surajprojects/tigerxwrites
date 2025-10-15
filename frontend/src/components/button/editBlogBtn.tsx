import { Link } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function EditBlogBtn({ linkTo = "#" }: { linkTo?: string }) {
    return (
        <>
            <Link to={linkTo} className="border rounded-md border-[#ebe6e0] font-sans text-sm font-semibold text-[#2a2522]  p-1.5 w-full mx-1 flex justify-center items-center outline-none ease-out duration-300 hover:text-white hover:bg-orange-500"
            ><PencilSquareIcon className="w-5 h-5 mr-1" />Edit</Link>
        </>
    );
};