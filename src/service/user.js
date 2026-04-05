import { request } from "@/config/request";

export const getUserSettings = () => {
  return request({ method: "GET", url: "/user/settings" });
};
export const userPostPorgotPasswordMutation = (data) => {
  return request({ method: "POST", url: "/user/forgot-password", data });
};

export const userPostForgotPasswordMutation = (data) => {
  return request({ method: "POST", url: "/user/forgot-password", data });
};

// Reset password - token va yangi parol
export const userPostResetPasswordMutation = (data) => {
  return request({ method: "POST", url: "/user/reset-password", data });
};

// Update password - authenticated user uchun
export const userPatchUpdatePasswordMutation = (data) => {
  return request({ method: "PATCH", url: "/user/update-password", data });
};
