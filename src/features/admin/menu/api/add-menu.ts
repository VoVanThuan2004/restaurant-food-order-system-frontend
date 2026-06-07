import { http } from "../../../../app/api/http";
import type { MenuDTO } from "../types/menu";

export const addMenu = async (menu: MenuDTO) => {
  const formData = new FormData();
  formData.append("categoryId", menu.categoryId);
  formData.append("name", menu.name);
  formData.append("price", String(menu.price));

  const file = menu.image?.[0]?.originFileObj;
  if (file instanceof File) {
    formData.append("image", file);
  }

  const res = await http.post("/menu/", formData);
  return res.data;
};
