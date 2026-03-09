import AdminMastering from "@/components/template/AdminMastering/AdminMastering";
import SuperAdminMastering from "@/components/template/SuperAdminMastering/SuperAdminMastering";
import { UserContext } from "@/context/UserContext";
import React, { useContext } from "react";

export default function Mastering() {
    const { roles } = useContext(UserContext);
    switch (roles) {
        case "ROLE_SYSTEM_ADMIN":
            return <SuperAdminMastering />;
        case "ROLE_ADMIN":
            return <AdminMastering />;
        case "ROLE_TEACHER":
            return "";
        case "ROLE_STUDENT":
            return "";
        default:
            return <NotFound />;
    }
}
