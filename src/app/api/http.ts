import axios from "axios";
import { tokenStorage } from "../../utils/token-storage";
import type { FailedRequest } from "../../types/failed.request";
import { getApiError } from "../../utils/get-api-error";
import { message } from "antd";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

http.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

http.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // =========================
    // NETWORK ERROR
    // =========================
    if (!error.response) {
      message.error("Không thể kết nối tới máy chủ");
      return Promise.reject(error);
    }

    // =========================
    // 401 - REFRESH TOKEN
    // =========================
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return http(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Gọi API refresh theo backend mới (dùng Cookie)
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
          {}, 
          { withCredentials: true }, // ← Gửi cookie
        );

        const newAccessToken = res.data.data;

        // Test
        message.success("Đã chạy api refresh token");

        tokenStorage.setAccessToken(newAccessToken);

        http.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return http(originalRequest);
      } catch (err: any) {
        processQueue(err, null);

        const status = err.response?.status;

        // Xử lý theo yêu cầu: 400, 404 hoặc các lỗi khác → logout
        if (status === 400 || status === 404 || status === 401) {
          message.error("Phiên đăng nhập đã hết hạn");
        } else {
          message.error("Đã xảy ra lỗi khi làm mới phiên");
        }

        tokenStorage.clear();
        window.location.href = "/login";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // =========================
    // GLOBAL SERVER ERRORS
    // =========================
    const apiError = getApiError(error);

    if (apiError.code >= 500) {
      message.error(apiError.message);
    }

    if (apiError.code === 409) {
      message.error(apiError.message || "Data conflict");
    }

    if (apiError.code === 429) {
      message.error("Too many requests. Please try again later");
    }

    return Promise.reject(error);
  },
);
