import { http } from "../../../../app/api/http";

export const isActiveUserApi = async (userId: string) => {
  const res = await http.put(`/auth/active/${userId}`);
  return res.data;
};
