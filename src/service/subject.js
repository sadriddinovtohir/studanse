import { request } from "@/config/request";

export const subjectAll = (params, data) => {
    return request({ method: "GET", url: "/subject", params, data });
};

export const subjectCreate = (data) => {
    return request({ method: "POST", url: "/subject", data });
};

export const subjectUpdate = (id, data) => {
    return request({ method: "PUT", url: `/subject/${id}`, data });
};

export const subjectDelete = (id) => {
    return request({ method: "DELETE", url: `/subject/${id}` });
};

export const subjectById = (id) => {
    return request({ method: "GET", url: `/subject/${id}` });
};
