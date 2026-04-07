import { request } from "@/config/request";

export const adminInfoStudentID = (id) => {
  return request({ method: "GET", url: `/admin/student-report/${id}` });
};
