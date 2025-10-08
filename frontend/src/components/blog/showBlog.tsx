import { formatDate } from "../../utils/dateAndTime";

export default function ShowBlog({
    title = "Blog Title",
    postedOn = "2025-01-01",
    content = "Blog Content..."
}: {
    title?: string,
    postedOn?: string,
    content?: string,
}) {
    return (
        <>
            <section className="m-5">
                <h1 className="text-5xl font-extrabold">{title}</h1>
                <p className="text-gray-500 my-5">Posted on {formatDate(postedOn) ? formatDate(postedOn, "MONTHFIRSTFULL") : postedOn}</p>
                <p className="text-slate-800 leading-7">{content}</p>
            </section>
        </>
    );
};