import { Outlet } from "react-router-dom";

export default function AuthLayout() {

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 py-6">
            <Outlet />
        </div>
    )
}