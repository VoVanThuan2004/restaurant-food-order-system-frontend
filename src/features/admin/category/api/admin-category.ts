import { http } from "../../../../app/api/http";

export const fetchAllCategories = async () => {
  const res = await http.get("/category/");
  return res.data;
};

export const addCategoryApi = async (categoryName: string) => {
  const res = await http.post("/category/", { categoryName });
  return res.data;
};

export const deleteCategoryApi = async (_id: string) => {
  const res = await http.delete(`/category/${_id}`);
  return res.data;
};

export const updateCategoryApi = async (_id: string, categoryName: string) => {
  const res = await http.put(`/category/${_id}`, { categoryName });
  return res.data;
};
