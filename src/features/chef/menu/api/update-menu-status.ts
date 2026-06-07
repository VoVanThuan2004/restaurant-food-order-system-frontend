import { http } from "../../../../app/api/http";

export const updateMenuStatusApi = async (menuId: string) => {
  const res = await http.put(`/menu/status/${menuId}`);
  return res.data;
};
