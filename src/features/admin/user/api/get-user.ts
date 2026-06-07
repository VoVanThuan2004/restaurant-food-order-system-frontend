import { http } from "../../../../app/api/http";

export const getUsersApi = async (page: number, limit: number) => {
  const res = await http.get(`/auth/users/admin/?page=${page}&limit=${limit}`);
  console.log(res.data);

  return res.data;
};
