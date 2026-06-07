import axios from "axios";
import type { ApiError } from "../types/api.error";

export function getApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data ?? {
        status: "error",
        code: 500,
        message: "Có lỗi xảy ra. Vui lòng thử lại",
      }
    );
  }

  return {
    status: "error",
    code: 500,
    message: "Có lỗi xảy ra. Vui lòng thử lại",
  };
}
