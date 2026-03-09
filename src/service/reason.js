import { request } from "@/config/request";

export const reasonAll = (params, data) => {
    return request({ method: "GET", url: "/reason", params, data });
};

export const reasonCreate = (data) => {
    return request({ method: "POST", url: "/reason", data });
};

export const reasonUpdate = (id, data) => {
    return request({ method: "PUT", url: `/reason/${id}`, data });
};

export const reasonDelete = (id) => {
    return request({ method: "DELETE", url: `/reason/${id}` });
};

export const reasonById = (id) => {
    return request({ method: "GET", url: `/reason/${id}` });
};
