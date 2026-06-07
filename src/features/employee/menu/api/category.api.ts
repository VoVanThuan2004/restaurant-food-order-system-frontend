import { http } from "../../../../app/api/http";

export const fetchAllCategories = async () => {
  const res = await http.get("/category/");
  return res.data;
};
