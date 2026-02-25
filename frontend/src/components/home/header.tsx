import { useState } from "react";
import MobileHeader from "./mobileHeader";
import { Link, NavLink } from "react-router-dom";
import NewBlogStreamBtn from "../button/newBlogStreamBtn";
import { Bars3Icon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <>
      <header className="w-full font-sans font-medium fixed top-0 left-0 z-50 bg-white/30 backdrop-blur-sm border-b border-white/10 shadow-sm">
        <nav className="flex justify-between items-center px-4 md:px-8 py-3.5 md:py-3 mx-auto w-full xl:max-w-7xl">
          {/* Title */}
          <div className="text-2xl font-bold whitespace-nowrap shrink text-orange-500">
            <Link to={"/"}>Tiger Writes</Link>
          </div>
          {/* Mobile Header Button */}
          <button
            type="button"
            onClick={() => setShowMenu((prevData) => !prevData)}
            className="size-7 cursor-pointer hover:bg-gray-200/75 text-gray-800 px-0.5 rounded-md transition duration-300 ease-in-out block md:hidden"
          >
            {showMenu ? <XMarkIcon strokeWidth={1.5} /> : <Bars3Icon strokeWidth={1.5} />}
          </button>
          {/* Nav Links */}
          <ul className="hidden md:flex text-[#7c706a] text-sm">
            <li className="mx-3 hover:text-orange-500 duration-300 ease-out">
              <NavLink to={"/"} className={({ isActive }) => (isActive ? "text-orange-500" : "")}>
                Home
              </NavLink>
            </li>
            <li className="mx-3 hover:text-orange-500 duration-300 ease-out">
              <NavLink
                to={"/blogs"}
                className={({ isActive }) => (isActive ? "text-orange-500" : "")}
              >
                All Blogs
              </NavLink>
            </li>
            <li className="mx-3 hover:text-orange-500 duration-300 ease-out">
              <NavLink
                to={"/about"}
                className={({ isActive }) => (isActive ? "text-orange-500" : "")}
              >
                About
              </NavLink>
            </li>
            <NewBlogStreamBtn />
          </ul>
          <ul className="hidden md:flex text-sm">
            <li className=" text-gray-800 hover:text-white hover:bg-orange-400 px-3 py-2 rounded-md mx-1 duration-300 ease-out hover:cursor-pointer">
              <Link to={"/signin"}>Sign In</Link>
            </li>
            <li className="text-white bg-orange-500 px-3 py-2 rounded-md mx-2 duration-300 ease-out hover:cursor-pointer hover:bg-orange-400">
              <Link to={"/blogs/new"} className="flex justify-center items-center">
                <PencilIcon className="w-4 h-4" />
                <span className="ml-1">Write</span>
              </Link>
            </li>
          </ul>
          {/* Mobile Header */}
          {showMenu && <MobileHeader setShowMenu={setShowMenu} />}
        </nav>
      </header>
    </>
  );
}
