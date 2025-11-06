import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <footer className="w-full border-t border-[#ebe6e0] bg-[#fffdfc]">
                <div className="flex flex-col md:flex-row justify-between mx-auto py-12 px-4 md:px-8 border-b border-[#ebe6e0] w-full xl:max-w-7xl">
                    <div className="max-w-xs lg:max-w-sm">
                        <h6 className="font-bold text-2xl text-orange-500">Tiger Writes</h6>
                        <p className="text-[#7c706a] my-4">A platform for writers to share their stories, insights, and perspectives with a global audience.</p>
                    </div>
                    <ul className="text-[#7c706a] my-5 w-fit md:my-auto">
                        <li className="m-3 mb-4 text-black font-medium">Explore</li>
                        <li className="m-3 hover:text-orange-500 duration-300 ease-out">
                            <Link to={"/#featured"}>Featured</Link>
                        </li>
                        <li className="m-3 hover:text-orange-500 duration-300 ease-out">
                            <Link to={"/blogs"}>All Blogs</Link>
                        </li>
                        <li className="m-3 hover:text-orange-500 duration-300 ease-out">
                            <Link to={"#"}>Writers</Link>
                        </li>
                        <li className="m-3 hover:text-orange-500 duration-300 ease-out">
                            <Link to={"/about"}>About</Link>
                        </li>
                    </ul>
                    <ul className="text-[#7c706a] w-fit mr-12">
                        <li className="m-3 mb-4 text-black font-medium">Connect</li>
                        <li className="m-3 hover:text-orange-500 duration-300 ease-out">
                            <Link to={"#"}>Twitter</Link>
                        </li>
                        <li className="m-3 hover:text-orange-500 duration-300 ease-out">
                            <Link to={"#"}>Instagram</Link>
                        </li>
                        <li className="m-3 hover:text-orange-500 duration-300 ease-out">
                            <Link to={"#"}>LinkedIn</Link>
                        </li>
                        <li className="m-3 hover:text-orange-500 duration-300 ease-out">
                            <a href="https://tigerxinsights.com/#contact" target="_blank">Contact</a>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col justify-center items-center py-8 px-5">
                    <div className="text-sm text-[#7c706a] font-medium text-center flex flex-col items-center">
                        <span>Made with ❤️ by TigerxInsights &copy; 2025</span>
                        <span>Your insights, our priority</span>
                    </div>
                </div>
            </footer>
        </>
    );
};