import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDiningTableApi } from "../../services/dining-table.api";
import type { DiningTableRequest } from "../../types/dining-table.type";
import { message } from "antd";
import { getApiError } from "../../utils/get-api-error";

type Props = {
  diningTableId: string;
  diningTable: DiningTableRequest;
};

export const useUpdateDiningTable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: Props) => updateDiningTableApi(props),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["diningTables"] });
      message.success(data.message || "Cập nhật bàn ăn thành công!");
    },
    onError: (error) => {
      const apiError = getApiError(error);
      message.error(
        apiError.message || "Lỗi khi cập nhật bàn ăn, vui lòng thử lại!",
      );
    },
  });
};
