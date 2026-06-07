import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDineTableApi } from "../api/delete-dine-table";
import type { AxiosError } from "axios";
import { message } from "antd";
import type { ApiError } from "../../../../types/api.error";

export const useDeleteDineTableMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dineTableId: string) => deleteDineTableApi(dineTableId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-dine-tables"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const messageError = error.response?.data?.message || "Có lỗi xảy ra";
      message.error(messageError);
      console.log(error);
    },
  });
};
