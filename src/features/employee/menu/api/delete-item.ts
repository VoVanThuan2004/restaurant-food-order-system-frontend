import { http } from "../../../../app/api/http";

export const deleteItemApi = async (orderItemId: string) => {
  const res = await http.delete(`/orders/${orderItemId}`);
  return res.data;
};
