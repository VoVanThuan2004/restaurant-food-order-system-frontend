import { http } from "../../../../app/api/http";

export const getOrderItemsApi = async (orderId: string | null) => {
  if (orderId === null || !orderId) return;
  const res = await http.get(`/orders/${orderId}`);
  return res.data;
};
