import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiError } from "../../utils/get-api-error";
import { message } from "antd";
import { confirmStatusItemApi } from "../../services/order-item.api";

type Props = {
  orderItemId: string;
  status: string;
};

export const useConfirmStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: Props) => confirmStatusItemApi(props),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["infinite-chef-orders"] });
    },
    onError: (error: any) => {
      const apiError = getApiError(error);
      message.error(apiError.message || "Lỗi khi cập nhật trạng thái món ăn");
    },
  });
};
