import { http } from "../../../../app/api/http";

export const getMenusByCategoryApi = async (categoryId: string | null) => {
  const res = await http.get(`/admin/menu/?categoryId=${categoryId}`);
  return res.data;
};
