import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { OrderItemRequest } from "../../types/order.type";
import { addOrderItemApi } from "../../services/order.api";
import { getApiError } from "../../utils/get-api-error";
import { message } from "antd";

export const useAddOrderItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderItemRequest: OrderItemRequest) =>
      addOrderItemApi(orderItemRequest),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["order-detail"] });
      message.success(data.message || "Thêm món ăn vào đơn gọi món thành công");
    },
    onError: (error: any) => {
      const apiError = getApiError(error);
      message.error(
        apiError.message || "Lỗi khi thêm món ăn vào đơn gọi món",
      );
    },
  });
};
