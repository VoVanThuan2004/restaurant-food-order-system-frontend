import type { ApiResponse } from "../../types/api.response";
import type { User } from "../../types/user.type";
import { http } from "./http";

export const getUserProfileApi = async () => {
  const res = await http.get<ApiResponse<User>>("/auth/users/");
  return res.data;
};
