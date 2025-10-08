import { Outlet } from "react-router-dom";

export default function BlogLayout() {
    return (
        <>
            <p>Blog Header</p>
            <main>
                <Outlet />
            </main>
            <p>Blog Footer</p>
        </>
    );
};