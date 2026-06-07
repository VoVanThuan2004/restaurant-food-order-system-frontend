import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmItemApi } from "../api/confirm-item";
import type { AxiosError } from "axios";
import type { ApiError } from "../../../../types/api.error";
import { message } from "antd";

export const useConfirmItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderItemId: string) => confirmItemApi(orderItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chef-orders-pending"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const errMessage = error.response?.data.message;
      message.error(errMessage);
    },
  });
};
