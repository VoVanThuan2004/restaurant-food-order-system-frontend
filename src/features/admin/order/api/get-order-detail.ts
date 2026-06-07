import { http } from "../../../../app/api/http";
import type { ApiResponse } from "../../../../types/api.response";
import type { OrderDetailType } from "../types/order-detail";

export const getOrderDetailApi = async (orderId: string) => {
  const res = await http.get<ApiResponse<OrderDetailType>>(`/orders/${orderId}`);
  return res.data;
};
