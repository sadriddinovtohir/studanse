import AdminHome from "@/components/template/AdminHome/AdminHome";
import StudentHome from "@/components/template/StudentHome/StudentHome";
import SuperAdminHome from "@/components/template/SuperAdminHome/SuperAdminHome";
import TeacherHome from "@/components/template/TeacherHome/TeacherHome";
import { UserContext } from "@/context/UserContext";
import React, { useContext } from "react";
import NotFound from "../not-found/NotFound";

export default function Home() {
    const { roles } = useContext(UserContext);
    switch (roles) {
        case "ROLE_SYSTEM_ADMIN":
            return <SuperAdminHome />;
        case "ROLE_ADMIN":
            return <AdminHome />;
        case "ROLE_TEACHER":
            return <TeacherHome />;
        case "ROLE_STUDENT":
            return <StudentHome />;
        default:
            return <NotFound />;
    }
}
