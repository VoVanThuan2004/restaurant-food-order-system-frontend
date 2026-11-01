import { useState } from "react";
import { resendVerificationApi } from "../../services/auth.api";
import type { ApiResponse } from "../../types/api.response";
import { getApiError } from "../../utils/get-api-error";

export const useResendVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resend = async (email: string): Promise<ApiResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await resendVerificationApi({
        email: email.trim().toLowerCase(),
      });

      if (res.status !== "success") {
        setError(res.message || "Không thể gửi lại email xác thực");
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

  return { loading, error, resend };
};
