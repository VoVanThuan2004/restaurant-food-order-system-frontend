import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuantityItemApi } from "../api/update-quantity-item";
import { message } from "antd";
import type { AxiosError } from "axios";
import type { ApiError } from "../../../../types/api.error";

export const useUpdateQuantityItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderItemId,
      newQuantity,
    }: {
      orderItemId: string;
      newQuantity: number;
    }) => updateQuantityItemApi({ orderItemId, newQuantity }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-items"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const errMessage = error.response?.data.message || "Lỗi hệ thống";
      message.error(errMessage);

      console.log(error);
    },
  });
};
