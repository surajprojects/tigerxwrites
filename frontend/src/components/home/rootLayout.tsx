import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function RootLayout() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex flex-1 justify-center">
                    <Outlet />
                </main>
                <Footer />
                <ToastContainer theme="light" position="top-center" />
            </div>
        </>
    );
};