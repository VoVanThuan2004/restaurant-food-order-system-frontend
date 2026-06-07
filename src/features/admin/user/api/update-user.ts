import { http } from "../../../../app/api/http";
import type { UserUpdateDTO } from "../types/user";

export const updateUserApi = async (userId: string, user: UserUpdateDTO) => {
  const res = await http.put(`/auth/v2/users/admin/${userId}`, user);
  return res.data;
};
