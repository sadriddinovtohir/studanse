import { request } from "@/config/request";

export const adminAll = (params) => {
    return request({ method: "GET", url: "/admin", params });
};

export const adminCreate = (data) => {
    return request({ method: "POST", url: "/admin", data });
};

export const adminById = (id) => {
    return request({ method: "GET", url: `/admin/${id}` });
};

export const adminUpdate = (id, data) => {
    return request({ method: "PUT", url: `/admin/${id}`, data });
};

export const adminDelete = (id) => {
    return request({ method: "DELETE", url: `/admin/${id}` });
};

