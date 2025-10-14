export default function UserAvatar({
    name = "Avatar",
    size = "NORMAL",
}: {
    name?: string,
    size?: "SMALL" | "NORMAL" | "LARGE",
}) {
    return (
        <>
            {size === "SMALL" ?
                <div className="flex justify-center items-center">
                    <p className="capitalize absolute font-normal font-sans">{name[0]}</p>
                    <div className="bg-[#f9f5f1] rounded-full p-4"></div>
                </div>
                : size === "LARGE" ?
                    <div className="flex justify-center items-center">
                        <p className="capitalize absolute font-normal font-sans">{name[0]}</p>
                        <div className="bg-[#f9f5f1] rounded-full p-8"></div>
                    </div>
                    :
                    <div className="flex justify-center items-center">
                        <p className="capitalize absolute font-normal font-sans">{name[0]}</p>
                        <div className="bg-[#f9f5f1] rounded-full p-6"></div>
                    </div>
            }
        </>
    );
};