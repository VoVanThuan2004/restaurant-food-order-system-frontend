import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendOrderApi } from "../api/send-order";
import type { AxiosError } from "axios";
import type { ApiError } from "../../../../types/api.error";
import { notification } from "antd";

export const useSendOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string | null) => sendOrderApi(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-items"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const errMessage = error.response?.data.message;
      notification.error({
        title: "Lỗi",
        description: errMessage,
        placement: "topRight"
      });
    },
  });
};
