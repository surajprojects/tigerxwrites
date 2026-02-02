import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackBtn({
  linkTo = "#",
  text = "Back",
}: {
  linkTo?: string;
  text?: string;
}) {
  return (
    <>
      <Link
        to={linkTo}
        className="text-[#7c706a] hover:text-orange-500 ml-1 hover:cursor-pointer flex items-center duration-200 ease-out font-sans"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-1" />
        {text}
      </Link>
    </>
  );
}
