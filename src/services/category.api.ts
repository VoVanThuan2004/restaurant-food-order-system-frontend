import { http } from "../app/api/http";
import type { ApiResponse } from "../types/api.response";
import type {
  CategoryRequest,
  CategoryResponse,
  CategoryUpdate,
} from "../types/category.type";

export const getAllCategoriesApi = async () => {
  const res = await http.get<ApiResponse<CategoryResponse[]>>("/categories");
  return res.data;
};

export const addCategoryApi = async (category: CategoryRequest) => {
  const res = await http.post<ApiResponse>("/categories", category);
  return res.data;
};

export const updateCategoryApi = async (categoryUpdate: CategoryUpdate) => {
  const res = await http.put<ApiResponse>(
    `/categories/${categoryUpdate.categoryId}`,
    {
      categoryName: categoryUpdate.categoryName,
    },
  );
  return res.data;
};

export const deleteCategoryId = async (categoryId: string) => {
  const res = await http.delete<ApiResponse>(`/categories/${categoryId}`);
  return res.data;
};
