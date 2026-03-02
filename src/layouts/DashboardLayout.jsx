import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Sidebar from "../components/template/Sidebar/Sidebar";

export const DashboardLayout = () => {
    return (
        <div className="flex gap-2">
            <Sidebar />
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
            </Suspense>
        </div>
    );
};
