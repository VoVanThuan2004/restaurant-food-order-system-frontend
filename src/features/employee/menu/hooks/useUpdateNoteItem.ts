import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "../../../../types/api.error";
import { message } from "antd";
import { updateNoteItemApi } from "../api/update-note-item";

export const useUpdateNoteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderItemId,
      notes,
    }: {
      orderItemId: string;
      notes: string;
    }) => updateNoteItemApi(orderItemId, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-items"] });

      message.success("Cập nhật ghi chú món ăn thành công");
    },
    onError: (error: AxiosError<ApiError>) => {
      const errMessage = error.response?.data.message;
      message.error(errMessage);

      console.log(error);
    },
  });
};
