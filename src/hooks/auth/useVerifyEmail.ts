import { useCallback, useRef, useState } from "react";
import { verifyEmailApi } from "../../services/auth.api";
import { getApiError } from "../../utils/get-api-error";

export type VerifyEmailStatus = "idle" | "verifying" | "success" | "error";

export const useVerifyEmail = () => {
  const [status, setStatus] = useState<VerifyEmailStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const lastTokenRef = useRef<string | null>(null);

  const verify = useCallback(async (token: string) => {
    const normalizedToken = token.trim();

    if (!normalizedToken || lastTokenRef.current === normalizedToken) {
      return;
    }

    lastTokenRef.current = normalizedToken;
    setStatus("verifying");
    setError(null);

    try {
      const res = await verifyEmailApi({ token: normalizedToken });

      if (res.status !== "success") {
        setStatus("error");
        setError(res.message || "Xác thực email thất bại");
        return;
      }

      setStatus("success");
    } catch (error: unknown) {
      const apiError = getApiError(error);
      setStatus("error");
      setError(apiError.message);
    }
  }, []);

  return {
    status,
    error,
    verify,
    loading: status === "verifying",
  };
};
