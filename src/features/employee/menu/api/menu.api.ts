import { http } from "../../../../app/api/http";

export const fetchAllMenusByCategory = async (categoryId: string) => {
  const res = await http.get(`/menu/${categoryId}`);
  return res.data;
};
