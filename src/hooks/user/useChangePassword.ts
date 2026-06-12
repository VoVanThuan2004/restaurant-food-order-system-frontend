import { useState } from "react";

import axios from "axios";
import type { ChangePasswordDTO } from "../../types/auth.type";
import { changePasswordApi } from "../../services/auth.api";

export const useChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const changePassword = async (data: ChangePasswordDTO) => {
    setLoading(true);
    setError("");
    try {
      const res = await changePasswordApi(data);
      if (res.status !== "success") {
        throw new Error("Lỗi hệ thống");
      }

      return res;
    } catch (e: unknown) {
      let errorMessage = "Thay đổi mật khẩu thất bại. Vui lòng thử lại sau.";

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
      console.error("Change password error:", errorMessage);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, changePassword };
};
