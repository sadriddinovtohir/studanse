import React, { Suspense, useContext, lazy } from 'react'
const AdminInfo = lazy(() => import('@/components/template/DataInfo/AdminInfo/AdminInfo'));
const StudentInfo = lazy(() => import('@/components/template/DataInfo/StudentInfo/StudentInfo'));
const TeacherInfo = lazy(() => import('@/components/template/DataInfo/TeacherInfo/TeacherInfo'));
import { UserContext } from '@/context/UserContext';
import { WaveLoader } from '@/components/atoms/Loaer/Weveloader';

export default function DataInfo() {

  const { roles } = useContext(UserContext);

  if (!roles) {
    return <WaveLoader className={"text-textColor"} />;
  }
  const renderHome = () => {
    switch (roles) {
      case "ROLE_ADMIN":
        return <AdminInfo />;
      case "ROLE_TEACHER":
        return <TeacherInfo />;
      case "ROLE_STUDENT":
        return <StudentInfo />;
      default:
        return <NotFound />;
    }
  };
  return (
    <Suspense
      fallback={
        <div className="flex justify-center h-[100vh] items-center">
          {<WaveLoader className={"text-textColor w-12 h-12"} />}
        </div>
      }
    >
      {renderHome()}
    </Suspense>
  );
}
