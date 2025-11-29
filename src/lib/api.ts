import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MODE === "development"
    ? "http://localhost:3000/api"
    : "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.data.message === 'Token đã hết hạn' && error.response.status === 401) {
    typeof window !== "undefined" && localStorage.removeItem('accessToken');
    useAuthStore.getState().clearState();
  }
  return Promise.reject(error);
});

export default api;
