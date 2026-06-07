import { http } from "../app/api/http";
import type { ApiResponse } from "../types/api.response";

export const payOrderApi = async (
  orderId: string,
  paymentMethod: string,
  amountReceived: number,
) => {
  const res = await http.post<ApiResponse>("/payments", {
    orderId,
    paymentMethod,
    amountReceived,
  });

  return res.data;
};

// Api lấy thông tin chi tiết thanh toán
export const getPaymentDetail = async (orderId: string) => {
  const res = await http.get<ApiResponse>(`/payments/${orderId}/detail`);
  return res.data;
}
