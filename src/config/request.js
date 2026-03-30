import axios from "axios";
import { loadState } from "./storej";
import { toast } from "react-toastify";

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
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }

    if (status === 403) {
      toast.error("Bu amalni bajarishga ruxsatingiz yo'q");
    }

    return Promise.reject(error);
  },
);

export { request };
