import { request } from "@/config/request";

export const schoolCreate = (data) => {
    return request({ method: "POST", url: "/school", data });
};

export const schoolsAll = () => {
    return request({ method: "GET", url: "/school/all" });
};

export const schoolById = (id) => {
    return request({ method: "GET", url: `/school/${id}` });
};

export const schoolUpdate = (id, data) => {
    return request({ method: "PUT", url: `/school/${id}`, data });
};

export const schoolDelete = (id) => {
    return request({ method: "DELETE", url: `/school/${id}` });
};

export const schoolMine = () => {
    return request({ method: "GET", url: "/school/mine" });
};

export const schoolMineUpdate = (id, data) => {
    return request({ method: "PUT", url: `/school/mine/${id}`, data });
};
