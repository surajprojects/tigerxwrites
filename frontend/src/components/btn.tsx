export type BtnType = "button" | "reset" | "submit";

export default function Btn({
    text = "Click here!",
    btnType = "button",
}: {
    text?: string,
    btnType?: BtnType,
}) {
    return (
        <>
            <button type={btnType} className="bg-[#18181a] text-white w-full text-sm font-medium py-2 sm:py-3 rounded-md hover:cursor-pointer mt-1">{text}</button>
        </>
    );
};