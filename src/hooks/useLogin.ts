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
    try {
      // gọi api login
      const res = await loginApi(payload);

      if (res.status !== "success" || !res.data) {
        throw new Error(res.message || "Login failed");
      }

      // api trả về thành công
      setSession(res.data);

      // Điều hướng theo role
      // const roles = res.data.roles;
      // console.log("roles: ", roles);
      
      // if (roles.includes("ADMIN")) {
      //   navigate("/admin", { replace: true });
      // }

      // if (roles.includes("CHEF")) {
      //   navigate("/chef", { replace: true });
      // }

      // if (roles.includes("STAFF")) {
      //   navigate("/dining-tables", { replace: true });
      // }
      

      setLoginSuccessData(res.data);
    } catch (error: unknown) {
      const apiError = getApiError(error);

      message.error(apiError.message ?? "Email hoặc mật khẩu không hợp lệ");
      return;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login, loginSuccessData };
};
