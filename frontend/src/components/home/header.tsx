import { Link } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function Header() {
    return (
        <>
            <header className="w-full font-sans font-medium fixed top-0 left-0 z-50 bg-white/30 backdrop-blur-sm border-b border-white/20 shadow-sm">
                <nav className="flex justify-between items-center px-4 md:px-8 py-3 mx-auto w-full xl:max-w-7xl">
                    <div className="text-2xl font-bold whitespace-nowrap shrink text-orange-500">
                        <Link to={"/"}>Tiger Writes</Link>
                    </div>
                    <ul className="hidden md:flex text-[#7c706a] text-sm">
                        <li className="mx-3 hover:text-orange-500 duration-300 ease-out">
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li className="mx-3 hover:text-orange-500 duration-300 ease-out">
                            <Link to={"/blogs"}>All Blogs</Link>
                        </li>
                        <li className="mx-3 hover:text-orange-500 duration-300 ease-out">
                            <Link to={"/about"}>About</Link>
                        </li>
                    </ul>
                    <ul className="flex text-sm">
                        <li className=" text-gray-800 hover:text-white hover:bg-orange-400 px-3 py-2 rounded-md mx-1 duration-300 ease-out hover:cursor-pointer">
                            <Link to={"/signin"}>Sign In</Link>
                        </li>
                        <li className="text-white bg-orange-500 px-3 py-2 rounded-md mx-2 duration-300 ease-out hover:cursor-pointer hover:bg-orange-400">
                            <Link to={"/blogs/new"} className="flex justify-center items-center"><PencilIcon className="w-4 h-4" /><span className="ml-1">Write</span></Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};