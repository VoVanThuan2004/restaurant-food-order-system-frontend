import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderItemNotes } from "../../services/order.api";
import { getApiError } from "../../utils/get-api-error";
import { message } from "antd";

type Props = {
  orderItemId: string;
  notes: string;
};

export const useUpdateItemNotes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: Props) => updateOrderItemNotes(props),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-detail"] });
    },
    onError: (error: any) => {
      const apiError = getApiError(error);
      message.error(apiError.message || "Lỗi khi cập nhật ghi chú món ăn");
    },
  });
};
