import React from "react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

export default function RootLayout() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
            </Suspense>
        </>
    );
}
