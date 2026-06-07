import { http } from "../app/api/http";
import type { ApiResponse } from "../types/api.response";
import type { RoleOptionResponse } from "../types/role.type";

// Lấy danh sách lựa chọn vai trò
export const getAllRoleOptionsApi = async () => {
  const res = await http.get<ApiResponse<RoleOptionResponse[]>>("/roles");
  return res.data;
};
