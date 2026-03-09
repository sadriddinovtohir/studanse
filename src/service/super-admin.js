import { request } from "@/config/request";

export const superAdminCreate = (data) => {
  return request({ method: "POST", url: "/admin/system-admin", data });
};

export const superAdminAll = (params) => {
  return request({ method: "GET", url: "/admin/system-admin", params });
};

export const superAdminById = (id) => {
  return request({ method: "GET", url: `/admin/system-admin/${id}` });
};

export const superAdminUpate = (id, data) => {
  return request({ method: "PUT", url: `/admin/system-admin/${id}`, data });
};

export const superAdminDelete = (id) => {
  return request({ method: "DELETE", url: `/admin/system-admin/${id}` });
};