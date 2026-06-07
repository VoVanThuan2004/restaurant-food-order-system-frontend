import { http } from "../../../../app/api/http";
import type { MenuDTO } from "../types/menu.type";

export const addMenuToOrderApi = async (menuDTO: MenuDTO) => {
  const res = await http.post("/orders/add-item/", menuDTO);
  return res.data;
};
