import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrderItemApi } from "../../services/order.api";
import { getApiError } from "../../utils/get-api-error";
import { message } from "antd";

export const useDeleteOrderItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderItemId: string) => deleteOrderItemApi(orderItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-detail"] });
    },
    onError: (error: any) => {
      const apiError = getApiError(error);
      message.error(
        apiError.message || "Lỗi khi xóa món ăn ra khỏi đơn gọi món",
      );
    },
  });
};
