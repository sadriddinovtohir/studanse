import React, { useContext, Suspense, lazy } from "react";
import { UserContext } from "@/context/UserContext";
import NotFound from "../not-found/NotFound";
import { WaveLoader } from "@/components/atoms/Loaer/Weveloader";

const SuperAdminHome = lazy(
  () => import("@/components/template/SuperAdminHome/SuperAdminHome"),
);
const AdminHome = lazy(
  () => import("@/components/template/AdminHome/AdminHome"),
);
const TeacherHome = lazy(
  () => import("@/components/template/TeacherHome/TeacherHome"),
);
const StudentHome = lazy(
  () => import("@/components/template/StudentHome/StudentHome"),
);

export default function Home() {
  const { roles } = useContext(UserContext);

  if (!roles) {
    return <div className='flex h-[50vh] justify-center items-center'>
      <WaveLoader />
    </div>
  }
  const renderHome = () => {
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
  };

  return (
    <Suspense
      fallback={
        <div className='flex h-[50vh] justify-center items-center'>
          <WaveLoader />
        </div>
      }
    >
      {renderHome()}
    </Suspense>
  );
}
