import { http } from "../../../../app/api/http";

export const sendOrderApi = async (orderId: string | null) => {
  const res = await http.put(`/orders/send/${orderId}`);
  return res.data;
};
