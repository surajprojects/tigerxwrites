import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <header>
                <nav className="w-full py-6 sm:py-8 px-8 sm:px-16 lg:px-28 font-semibold flex justify-between">
                    <div className="text-xl font-bold sm:text-2xl whitespace-nowrap shrink mr-2 sm:mr-0">
                        <a href="/">Tiger Writes</a>
                    </div>
                    <ul className="w-1/5 py-1 px-2 flex justify-between">
                        <li>
                            <Link to={"/blogs"}>Blogs</Link>
                        </li>
                        <li>
                            <Link to={"/blogs/new"}>New Blog</Link>
                        </li>
                        <li>
                            <Link to={"/signin"}>Sign In</Link>
                        </li>
                        <li>
                            <a href="https://www.tigerxinsights.com/contact">Contact</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};