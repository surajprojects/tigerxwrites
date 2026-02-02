import { Link } from "react-router-dom";

export default function FormAction({
  text = "Don't have an account?",
  linkTo = "#",
  linkName = "Sign up",
}: {
  text?: string;
  linkTo?: string;
  linkName?: string;
}) {
  return (
    <>
      <p className="my-2 text-sm text-[#7c706a] font-sans">
        {text}
        <Link to={linkTo} className="text-orange-500 font-medium ml-1 hover:cursor-pointer">
          {linkName}
        </Link>
      </p>
    </>
  );
}
