import { request } from "@/config/request";

export const authLogin = (data) => {
  return request({ method: "POST", url: "/auth/login", data });
};
export const authLogOut = () => {
  return request({ method: "POST", url: "/auth/logout" });
};
export const resetPassword = (data) => {
  return request({ method: "POST", url: "/user/reset-password", data });
};
