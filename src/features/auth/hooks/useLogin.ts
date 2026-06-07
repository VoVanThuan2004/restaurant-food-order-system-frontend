import { useState } from "react";
import type { LoginRequest } from "../types/auth.type";
import useAuthStore from "../stores/useAuthStore";
import { loginApi } from "../api/auth.api";
import axios from "axios";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setSession = useAuthStore((state) => state.setSession);

  const login = async (payload: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      // gọi api login
      const res = await loginApi(payload);

      if (res.status !== "success" || !res.data) {
        throw new Error(res.message || "Login failed");
      }

      // api trả về thành công
      setSession(res.data);

      return res.data;
    } catch (e: unknown) {
      let errorMessage = "Đăng nhập thất bại. Vui lòng thử lại sau.";

      // Cách 1: Ưu tiên dùng type guard của axios (rất khuyến nghị)
      if (axios.isAxiosError(e)) {
        // e giờ được narrow thành AxiosError
        errorMessage =
          e.response?.data?.message || // backend trả message trong body
          e.response?.data?.error || // nếu backend dùng key "error"
          e.message || // fallback axios message (ví dụ "Request failed with status code 401")
          "Lỗi từ server";
      } else if (e instanceof Error) {
        // Lỗi khác (throw new Error, network error...)
        errorMessage = e.message;
      } else if (typeof e === "string") {
        errorMessage = e;
      }

      setError(errorMessage);
      console.error("Login error:", e);

      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
};
