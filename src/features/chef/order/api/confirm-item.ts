import { http } from "../../../../app/api/http";

export const confirmItemApi = async (orderItemId: string) => {
  const res = await http.put(`/orders/confirm/${orderItemId}`);
  return res.data;
};
