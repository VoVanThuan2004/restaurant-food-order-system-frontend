import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiError } from "../../utils/get-api-error";
import { message } from "antd";
import { deleteCategoryId } from "../../services/category.api";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: string) => deleteCategoryId(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      const apiError = getApiError(error);

      message.error(apiError.message);
    },
  });
};