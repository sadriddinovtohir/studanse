import { lazy } from "react";

const AdminSettings = lazy(
  () => import("@/components/template/AdminSettings/AdminSettings"),
);

const StudentSettings = lazy(
  () => import("@/components/template/StudentSettings/StudentSettings"),
);

const SuperAdminSettings = lazy(
  () => import("@/components/template/SuperAdminSettings/SuperAdminSettings"),
);

const TeacherSettings = lazy(
  () => import("@/components/template/TeacherSettings/TeacherSettings"),
);
import { Spinner } from "@/components/ui/spinner";
import { UserContext } from "@/context/UserContext";
import React, { Suspense, useContext } from "react";

export default function AccountSettings() {
  const { roles } = useContext(UserContext);

  if (!roles) {
    return <Spinner className={"text-textColor"} />;
  }
  const renderSettings = () => {
    switch (roles) {
      case "ROLE_SYSTEM_ADMIN":
        return <SuperAdminSettings />;
      case "ROLE_ADMIN":
        return <AdminSettings />;
      case "ROLE_TEACHER":
        return <TeacherSettings />;
      case "ROLE_STUDENT":
        return <StudentSettings />;
      default:
        return <NotFound />;
    }
  };
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex justify-center h-[100vh] items-center">
            {<Spinner className={"text-textColor w-12 h-12"} />}
          </div>
        }
      >
        {renderSettings()}
      </Suspense>
    </div>
  );
}
