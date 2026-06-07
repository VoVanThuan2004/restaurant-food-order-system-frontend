import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeOrderApi } from "../../services/order.api";
import { notification } from "antd";
import { getApiError } from "../../utils/get-api-error";

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => placeOrderApi(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-detail"] });
      notification.success({
        title: "Đặt món ăn thành công",
        message: "Món ăn đang chờ nhân viên bếp xác nhận",
      });
    },
    onError: (error: any) => {
      const apiError = getApiError(error);
      notification.error({
        title: "Lỗi khi đặt món ăn",
        message: apiError.message || "Vui lòng thử lại",
      });
    },
  });
};
