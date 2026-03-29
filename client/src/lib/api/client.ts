import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

const apiClient = axios.create({ baseURL });

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const { refreshToken, setAuth, clearAuth } = useAuthStore.getState();
      if (!refreshToken) { clearAuth(); return Promise.reject(error); }
      try {
        const { data } = await axios.post(`${baseURL}/auth/refresh`, {
          accessToken: useAuthStore.getState().accessToken,
          refreshToken,
        });
        const { user, accessToken: newAccess, refreshToken: newRefresh } = data.data;
        setAuth(user, newAccess, newRefresh);
        original.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(original);
      } catch {
        clearAuth();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
