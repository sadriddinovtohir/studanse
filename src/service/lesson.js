import { request } from "@/config/request";

export const lessonAll = (params, data) => {
  return request({ method: "GET", url: "/lesson", params, data });
};

export const lessonCreate = (data) => {
  return request({ method: "POST", url: "/lesson", data });
};

export const lessonById = (userId) => {
  return request({ method: "GET", url: `/lesson/${userId}` });
};

export const lessonUpdate = (id, data) => {
  return request({ method: "PUT", url: `/lesson/${id}`, data });
};

export const lessonDelete = (id) => {
  return request({ method: "DELETE", url: `/lesson/${id}` });
};

// attendance  in student

export const attendancePost = (payload) => {
  return request({ method: "POST", url: "/attendance", data: payload });
};

//delete
export const attendeseDeleteMutation = (id) => {
  return request({ method: "DELETE", url: `/scheduled-attendance/${id}` });
};

export const attendeseEditeMutation = (id, payload) => {
  return request({ method: "PUT", url: `/scheduled-attendance/${id}`, data:payload });
};
