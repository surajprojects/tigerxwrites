import { useContext } from "react";
import SignOutBtn from "../button/signOutBtn";
import { Link, NavLink } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/outline";
import { UserDataContext } from "../../store/userContext";

export default function MobileHeader({
  setShowMenu,
}: {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userData = useContext(UserDataContext);
  return (
    <>
      {/* Nav Links */}
      <ul
        onClick={() => setShowMenu((prevData) => !prevData)}
        className="flex flex-col absolute top-14 right-4 w-48 text-sm border border-gray-50 shadow-sm font-inter md:hidden bg-white p-2 rounded-lg"
      >
        <li className="mx-3 hover:text-orange-500 duration-300 ease-out py-1 px-1">
          <NavLink to={"/"} className={({ isActive }) => (isActive ? "text-orange-500" : "")}>
            Home
          </NavLink>
        </li>
        <li className="mx-3 hover:text-orange-500 duration-300 ease-out py-1 px-1">
          <NavLink to={"/blogs"} className={({ isActive }) => (isActive ? "text-orange-500" : "")}>
            All Blogs
          </NavLink>
        </li>
        <li className="mx-3 hover:text-orange-500 duration-300 ease-out py-1 px-1">
          <NavLink to={"/about"} className={({ isActive }) => (isActive ? "text-orange-500" : "")}>
            About
          </NavLink>
        </li>
        {/* CTA */}
        <li className=" text-gray-800 hover:text-white hover:bg-orange-400 px-3 py-2 rounded-md mx-1 duration-300 ease-out hover:cursor-pointer mb-1.5">
          {userData && userData.userData.id.length > 1 ? (
            <SignOutBtn />
          ) : (
            <Link to={"/signin"}>Sign In</Link>
          )}
        </li>
        <li className="text-white bg-orange-500 px-3 py-2 rounded-md mx-1 duration-300 ease-out hover:cursor-pointer hover:bg-orange-400">
          <Link to={"/blogs/new"} className="flex justify-center items-center">
            <PencilIcon className="w-4 h-4" />
            <span className="ml-1">Write</span>
          </Link>
        </li>
      </ul>
    </>
  );
}
