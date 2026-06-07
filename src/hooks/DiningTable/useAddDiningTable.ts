import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDiningTableApi } from "../../services/dining-table.api";
import type { DiningTableRequest } from "../../types/dining-table.type";
import { message } from "antd";
import { getApiError } from "../../utils/get-api-error";

export const useAddDiningTable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (diningTable: DiningTableRequest) =>
      addDiningTableApi(diningTable),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["diningTables"] });
      message.success(data.message || "Thêm bàn ăn thành công!");
    },
    onError: (error) => {
      const apiError = getApiError(error);
      message.error(
        apiError.message || "Lỗi khi thêm bàn ăn, vui lòng thử lại!",
      );
    },
  });
};
