import { request } from "@/config/request";

export const adminInfoStudentID = (id) => {
  return request({ method: "GET", url: `/admin/student-report/${id}` });
};

// admin data info
export const adminGetInfo = (classId) => {
  return request({
    method: "GET",
    url: `admin/dashboard`,
    params: classId ? { classId } : {},
  });
};

export const teacherInfo = () => {
  return request({ method: "GET", url: `teacher/dashboard` });
};

export const teacherStudentsInfo = () => {
  return request({ method: "GET", url: "/teacher/classes-students" });
};
