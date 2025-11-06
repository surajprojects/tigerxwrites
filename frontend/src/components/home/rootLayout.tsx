import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "../ui/scrollToTop";

export default function RootLayout() {
    return (
        <>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex flex-1 justify-center bg-[#fffcfa]">
                    <Outlet />
                </main>
                <Footer />
                <ToastContainer theme="light" position="bottom-right" />
            </div>
        </>
    );
};