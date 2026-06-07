import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderItemQuantity } from "../../services/order.api";
import { getApiError } from "../../utils/get-api-error";
import { message } from "antd";

type Props = {
  orderItemId: string;
  newQuantity: number;
};

export const useUpdateItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: Props) => updateOrderItemQuantity(props),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-detail"] });
    },
    onError: (error: any) => {
      const apiError = getApiError(error);
      message.error(
        apiError.message || "Lỗi khi cập nhật số lượng món ăn",
      );
    },
  });
};
