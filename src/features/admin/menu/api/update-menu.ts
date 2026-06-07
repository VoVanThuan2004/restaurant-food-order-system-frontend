import { http } from "../../../../app/api/http";
import type { MenuUpdateDTO } from "../types/menu";


export const updateMenu = async (menu: MenuUpdateDTO) => {
  const formData = new FormData();
  formData.append("categoryId", menu.categoryId);
  formData.append("name", menu.name);
  formData.append("price", String(menu.price));

  const file = menu.image?.[0]?.originFileObj;
  if (file instanceof File) {
    formData.append("image", file);
  }

  const res = await http.put(`/menu/${menu._id}`, formData);
  return res.data;
};