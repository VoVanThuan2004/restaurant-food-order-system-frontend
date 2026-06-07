import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { updateDishStatusApi } from "../../services/dish.api";

export const useUpdateDishStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dishId: string) => updateDishStatusApi(dishId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["infinite-dishes"] });
    },
    onError: (data) => {
      message.error(data.message || "Cập nhật bị lỗi, vui lòng thử lại!");
    },
  });
};
