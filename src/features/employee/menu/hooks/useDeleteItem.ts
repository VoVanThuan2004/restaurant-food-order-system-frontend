import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItemApi } from "../api/delete-item";
import type { AxiosError } from "axios";
import type { ApiError } from "../../../../types/api.error";
import { message } from "antd";
import { useTotalItemsStore } from "../stores/useTotalItemsStore";

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  const decreaseItem = useTotalItemsStore((state) => state.decreaseItem);

  return useMutation({
    mutationFn: (orderItemId: string) => deleteItemApi(orderItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-items"] });

      // Cập global state cho tổng số items trong cart
      decreaseItem();
    },
    onError: (error: AxiosError<ApiError>) => {
      const errMessage = error.response?.data.message;
      message.error(errMessage);
      console.log(error);
    },
  });
};
