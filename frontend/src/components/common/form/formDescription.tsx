import { Link } from "react-router-dom";

export default function FormDescription({
    text = "Form Description",
    linkTo = "#",
    linkName = "Click here!",
}: {
    text?: string,
    linkTo?: string,
    linkName?: string,
}) {
    return (
        <>
            <p className="my-2 text-gray-500 text-base sm:text-lg font-normal">{text}<Link to={linkTo} className="underline ml-2 hover:cursor-pointer">{linkName}</Link></p>
        </>
    );
};