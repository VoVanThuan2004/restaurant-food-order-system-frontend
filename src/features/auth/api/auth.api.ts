import { http } from "../../../app/api/http";
import type { ApiResponse } from "../../../types/api.response";
import type { LoginRequest, LoginSuccessData } from "../types/auth.type";


export const loginApi = async (payload: LoginRequest) => {
  const res = await http.post<ApiResponse<LoginSuccessData>>(
    "/auth/login",
    payload,
    {
      withCredentials: true
    }
  );

  return res.data;
};

export const logoutApi = async (refreshToken: string) => {
  const res = await http.post<ApiResponse<null>>("/auth/logout", { refreshToken });
  return res.data;
};
