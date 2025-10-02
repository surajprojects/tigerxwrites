import { Outlet } from "react-router-dom";

export default function BlogLayout() {
    return (
        <>
            <p>Blog Header</p>
            <Outlet />
            <p>Blog Footer</p>
        </>
    );
};