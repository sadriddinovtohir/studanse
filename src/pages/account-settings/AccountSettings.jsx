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
import { UserContext } from "@/context/UserContext";
import React, { Suspense, useContext } from "react";
import { WaveLoader } from "@/components/atoms/Loaer/Weveloader";

export default function AccountSettings() {
  const { roles } = useContext(UserContext);

  if (!roles) {
  <div className='flex h-[50vh] justify-center items-center'>
          <WaveLoader />
        </div>
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
          <div className="flex justify-center h-[50vh] items-center">
            {<WaveLoader />}
          </div>
        }
      >
        {renderSettings()}
      </Suspense>
    </div>
  );
}
