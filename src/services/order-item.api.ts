import { http } from "../app/api/http";
import type { ApiResponse } from "../types/api.response";

// Api xác nhận trạng thái món ăn
export const confirmStatusItemApi = async ({
  orderItemId,
  status,
}: {
  orderItemId: string;
  status: string;
}) => {
  const res = await http.put<ApiResponse>(
    `/order-items/${orderItemId}/confirm?status=${status}`,
  );
  return res.data;
};
