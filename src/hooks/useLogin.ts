import { useState } from "react";
import useAuthStore from "../stores/useAuthStore";
import type { LoginRequest, LoginSuccessData } from "../types/auth.type";
import { getApiError } from "../utils/get-api-error";
import { message } from "antd";
import { loginApi } from "../services/auth.api";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginSuccessData, setLoginSuccessData] = useState<LoginSuccessData>();

  const setSession = useAuthStore((state) => state.setSession);

  const login = async (payload: LoginRequest) => {
    setLoading(true);
    setError(null);
    setLoginSuccessData(undefined);

    try {
      const res = await loginApi(payload);

      if (res.status !== "success" || !res.data) {
        const errorMessage = res.message || "Đăng nhập thất bại";
        setError(errorMessage);
        message.error(errorMessage);
        return;
      }

      setSession(res.data);
      setLoginSuccessData(res.data);
    } catch (error: unknown) {
      const apiError = getApiError(error);
      const errorMessage =
        apiError.message || "Email hoặc mật khẩu không chính xác";

      setError(errorMessage);
      message.error(errorMessage);
      return;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login, loginSuccessData };
};
