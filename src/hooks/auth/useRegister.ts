import { useState } from "react";
import { registerApi } from "../../services/auth.api";
import type { ApiResponse } from "../../types/api.response";
import type {
  CustomerRegisterRequest,
  CustomerRegisterResponse,
} from "../../types/auth.type";
import { getApiError } from "../../utils/get-api-error";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    payload: CustomerRegisterRequest,
  ): Promise<ApiResponse<CustomerRegisterResponse> | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await registerApi(payload);

      if (res.status !== "success") {
        setError(res.message || "Đăng ký thất bại. Vui lòng thử lại");
        return null;
      }

      return res;
    } catch (error: unknown) {
      const apiError = getApiError(error);
      setError(apiError.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, register };
};
