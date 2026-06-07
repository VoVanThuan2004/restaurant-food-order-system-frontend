import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CategoryUpdate } from "../../types/category.type";
import { updateCategoryApi } from "../../services/category.api";
import { getApiError } from "../../utils/get-api-error";
import { message } from "antd";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryUpdate: CategoryUpdate) =>
      updateCategoryApi(categoryUpdate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      const apiError = getApiError(error);

      message.error(apiError.message);
    },
  });
};
