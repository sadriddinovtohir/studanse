import { request } from "@/config/request";

export const classGroupAll = () => {
    return request({ method: "GET", url: "/class-group/all" });
};

export const adminClassesStudents = () => {
    return request({ method: "GET", url: "/admin/classes-students" });
};

export const classGroup = (params) => {
    return request({ method: "GET", url: "/class-group", params });
};

export const classGroupById = (id) => {
    return request({ method: "GET", url: `/class-group/${id}` });
};

export const classGroupDelete = (id) => {
    return request({ method: "DELETE", url: `/class-group/${id}` });
};

export const classGroupCreate = (data) => {
    return request({ method: "POST", url: "/class-group", data });
};

export const classGroupUpdate = (id, data) => {
    return request({ method: "PUT", url: `/class-group/${id}`, data });
};
