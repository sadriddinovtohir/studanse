import { request } from "@/config/request";

export const teacherAll = (params, data) => {
    return request({ method: "GET", url: "/teacher", params, data });
};

export const teacherAdminAll = () => {
    return request({ method: "GET", url: "/teacher/all" });
};

export const teacherCreate = (data) => {
    return request({ method: "POST", url: "/teacher", data });
};

export const teacherUpdate = (id, data) => {
    return request({ method: "PUT", url: `/teacher/${id}`, data });
};

export const teacherById = (id) => {
    return request({ method: "GET", url: `/teacher/${id}` });
};

export const teacherDelete = (id) => {
    return request({ method: "DELETE", url: `/teacher/${id}` });
};
