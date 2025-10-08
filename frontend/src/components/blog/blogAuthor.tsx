import Dot from "../ui/dot";

export default function BlogAuthor({
    authorName = "Name",
    bio = "Bio...",
}: {
    authorName?: string,
    bio?: string,
}) {
    return (
        <>
            <section className="min-w-80 m-5">
                <p>Author</p>
                <div className="flex items-center mt-4">
                    <div className="-translate-y-3">
                        <Dot />
                    </div>
                    <div className="mx-5">
                        <h6 className="text-2xl font-bold">{authorName}</h6>
                        <p className="text-gray-500 mt-1">{bio}</p>
                    </div>
                </div>
            </section>
        </>
    );
};