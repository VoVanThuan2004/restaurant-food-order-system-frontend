import { http } from "../../../../app/api/http";

export const getMenuApi = async (categoryId: string | null) => {
  const res = await http.get(`/admin/menu/?categoryId=${categoryId}`);
  return res.data;
};

export const getCategoryApi = async () => {
  const res = await http.get("/category/");
  return res.data;
};
