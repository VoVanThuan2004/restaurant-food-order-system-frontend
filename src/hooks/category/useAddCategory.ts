import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CategoryRequest } from "../../types/category.type";
import { addCategoryApi } from "../../services/category.api";
import { getApiError } from "../../utils/get-api-error";
import { message } from "antd";

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: CategoryRequest) => addCategoryApi(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      const apiError = getApiError(error);

      message.error(apiError.message);
    },
  });
};
