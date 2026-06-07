import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategoryApi, deleteCategoryApi, updateCategoryApi } from "../api/admin-category";
import type { AxiosError } from "axios";
import type { ApiError } from "../../../../types/api.error";
import { message } from "antd";

// gọi API thêm danh mục
export const useAddCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryName: string) => addCategoryApi(categoryName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
    onError: (error) => {
      console.error("Lỗi:", error);
    },
  });
};

// gọi API xóa danh mục
export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_id: string) => deleteCategoryApi(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
    onError: (error: AxiosError<ApiError>) => {

      const errorMessage = error.response?.data?.message || "Lỗi khi xóa danh mục";
      message.error(errorMessage);

      console.error("Lỗi:", error);
    },
  });
};

// gọi API cập nhật danh mục
type UpdateCategoryPayload = {
  _id: string;
  categoryName: string;
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payLoad: UpdateCategoryPayload) => updateCategoryApi(payLoad._id, payLoad.categoryName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
    onError: (error) => {
      console.error("Lỗi:", error);
    },
  });
};
