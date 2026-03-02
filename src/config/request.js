import axios from "axios";
import { loadState } from "../sotej/localstorejs";

const request = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
});

request.interceptors.request.use((config) => {
    const token = loadState("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

request.interceptors.response.use(
    (respons) => {
        return respons;
    },
    (error) => {
        if (error.response?.status == 403 || error.response.status == 401) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export { request };
