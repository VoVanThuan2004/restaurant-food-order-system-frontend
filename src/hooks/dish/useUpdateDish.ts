import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDishApi } from "../../services/dish.api";
import type { DishRequest } from "../../types/dish.type";
import { message } from "antd";

type PropsUpdate = {
  dishId: string;
  dishRequest: DishRequest;
  file?: File;
};

export const useUpdateDish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (props: PropsUpdate) => updateDishApi(props),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-dishes"] });
      message.success(data.message || "Cập nhật món ăn thành công");
    },
    onError: (data) => {
      message.error(data.message || "Cập nhật bị lỗi, vui lòng thử lại!");
    },
  });
};
