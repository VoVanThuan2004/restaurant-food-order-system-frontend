import { http } from "../../../../app/api/http";

export const deleteMenu = async (menuId: string) => {
  const res = await http.delete(`/menu/${menuId}`);
  return res.data;
};
