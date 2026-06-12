import { http } from "../app/api/http";
import type { ApiResponse } from "../types/api.response";
import type {
  ChangePasswordDTO,
  LoginRequest,
  LoginSuccessData,
} from "../types/auth.type";

export const logoutApi = async () => {
  const res = await http.post<ApiResponse>(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    },
  );

  return res.data;
};

export const loginApi = async (payload: LoginRequest) => {
  const res = await http.post<ApiResponse<LoginSuccessData>>(
    "/auth/login",
    payload,
    {
      withCredentials: true,
    },
  );

  return res.data;
};

// Api thay đổi mật khẩu
export const changePasswordApi = async (
  changePasswordDTO: ChangePasswordDTO,
) => {
  const res = await http.post<ApiResponse>(
    "/auth/change-password",
    changePasswordDTO,
  );
  return res.data;
};
