import { request } from "@/config/request";

export const lessonAll = (params, data) => {
    return request({ method: "GET", url: "/lesson", params, data });
};

export const lessonCreate = (data) => {
    return request({ method: "POST", url: "/lesson", data });
};

export const lessonById = (id) => {
    return request({ method: "GET", url: `/lesson/${id}` });
};

export const lessonUpdate = (id, data) => {
    return request({ method: "PUT", url: `/lesson/${id}`, data });
};

export const lessonDelete = (id) => {
    return request({ method: "DELETE", url: `/lesson/${id}` });
};
