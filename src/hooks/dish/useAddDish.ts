import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDishApi } from "../../services/dish.api";
import type { DishRequest } from "../../types/dish.type";
import { getApiError } from "../../utils/get-api-error";
import { message } from "antd";

type Props = {
  file: File;
  dishRequest: DishRequest;
};

export const useAddDish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: Props) => addDishApi(props.dishRequest, props.file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-dishes"] });
    },
    onError: (error: any) => {
      const apiError = getApiError(error);
      message.error(
        apiError.message || "Lỗi khi thêm món ăn, vui lòng thử lại",
      );
    },
  });
};
