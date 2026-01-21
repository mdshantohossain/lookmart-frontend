import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "@/config/api";

// create axios request wiht token
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          API_URL + "/auth/refresh-token",
          null,
          {
            withCredentials: true,
          },
        );

        Cookies.set("auth_token", data.token, { expires: 7 });

        return axios(originalRequest);
      } catch (error) {
        Cookies.remove("auth_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
