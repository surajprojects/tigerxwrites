import { formatDate } from "../../utils/dateAndTime";

export default function NameDate({
    name = "Sarah",
    date = "2025-10-08",
    size = "NORMAL",
}: {
    name?: string,
    date?: string,
    size?: "SMALL" | "NORMAL" | "LARGE",
}) {
    return (
        <>
            {size === "SMALL" ?
                <div className="mx-2">
                    <p className="text-black text-sm font-sans font-medium">{name}</p>
                    <p className="text-xs font-sans">{formatDate(date) ? formatDate(date, "MONTHFIRST") : date}</p>
                </div>
                : size === "LARGE" ?
                    <div className="mx-2">
                        <p className="text-black text-lg font-sans font-medium">{name}</p>
                        <p className="text-base font-sans">{formatDate(date) ? formatDate(date, "MONTHFIRST") : date}</p>
                    </div>
                    :
                    <div className="mx-2">
                        <p className="text-black text-base font-sans font-medium">{name}</p>
                        <p className="text-sm font-sans">{formatDate(date) ? formatDate(date, "MONTHFIRST") : date}</p>
                    </div>
            }
        </>
    );
};