import { http } from "../../../../app/api/http";

export const getTotalItemsApi = async (orderId: string) => {
  const res = await http.get(`/orders/total-items/${orderId}`);
  return res.data;
};
