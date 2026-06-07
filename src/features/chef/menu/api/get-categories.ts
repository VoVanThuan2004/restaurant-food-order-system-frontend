import { http } from "../../../../app/api/http";

export const getCategoriesApi = async () => {
  const res = await http.get("/category/");
  return res.data;
};
