import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import AuthProvider from "./authProvider";
import ScrollToTop from "../ui/scrollToTop";
import { ToastContainer } from "react-toastify";

export default function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <AuthProvider>
        <div role="wrapper" className="flex flex-col min-h-screen">
          <Header />
          <main role="maincontent" className="flex flex-1 justify-center bg-[#fffcfa]">
            <Outlet />
          </main>
          <Footer />
          <ToastContainer theme="light" position="bottom-right" />
        </div>
      </AuthProvider>
    </>
  );
}
