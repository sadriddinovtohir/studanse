import { request } from "@/config/request";

export const getUserSettings = () => {
    return request({ method: "GET", url: "/user/settings" });
};
