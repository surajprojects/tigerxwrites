import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function ContactBtn({
    hrefLink = "#",
    text = "Get in Touch",
}: {
    hrefLink?: string,
    text?: string,
}) {
    return (
        <>
            <a href={hrefLink} className="bg-orange-500 font-sans text-white text-sm font-semibold py-2 px-4 rounded-md hover:cursor-pointer hover:bg-orange-500/90 duration-300 ease-out flex w-fit items-center justify-center"><EnvelopeIcon className="w-4 h-4 mr-2" />{text}</a>
        </>
    );
};  