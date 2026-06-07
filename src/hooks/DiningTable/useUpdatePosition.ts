import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDiningTablePositionApi } from "../../services/dining-table.api";
import { getApiError } from "../../utils/get-api-error";
import { message } from "antd";
import type { DiningTableResponse } from "../../types/dining-table.type";

type Props = {
  diningTableId: string;
  previousTableId: string | null;
  nextTableId: string | null;
};

export const useUpdatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: Props) => updateDiningTablePositionApi(props),
    onSuccess: (data) => {
      // Cập nhật cache trực tiếp với dữ liệu từ API
      if (data?.data && Array.isArray(data.data)) {
        queryClient.setQueryData(
          ["diningTables", null],
          (oldData: any) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              data: {
                ...oldData.data,
                content: data.data as DiningTableResponse[],
              },
            };
          }
        );
      }
    },
    onError: (error) => {
      const apiError = getApiError(error);
      message.error(
        apiError.message || "Cập nhật vị trí bàn ăn bị lỗi, vui lòng thử lại!",
      );
    },
  });
};
