import { http } from "../app/api/http";
import type { ApiResponse } from "../types/api.response";
import type {
  DishDetailResponse,
  DishRequest,
  DishResponse,
} from "../types/dish.type";
import type { PageResponse } from "../types/page.response.type";

type Props = {
  categoryId?: string;
  page: number;
  size: number;
};

export const getAllDishesApi = async (props: Props) => {
  const { categoryId, page, size } = props;

  const queryParams: Record<string, any> = {
    page,
    size,
  };
  if (categoryId && categoryId !== null) {
    queryParams.categoryId = categoryId;
  }

  const res = await http.get<ApiResponse<PageResponse<DishResponse>>>(
    "/dishes",
    {
      params: queryParams,
    },
  );
  return res.data;
};

// Api thêm món ăn mới
export const addDishApi = async (dishRequest: DishRequest, file: File) => {
  const formData = new FormData();

  // JSON stringify object
  formData.append(
    "data",
    new Blob([JSON.stringify(dishRequest)], {
      type: "application/json",
    }),
  );

  // file
  formData.append("file", file);

  const response = await http.post<ApiResponse>("/dishes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Api cập nhật món ăn mới
type PropsUpdate = {
  dishId: string;
  dishRequest: DishRequest;
  file?: File;
};
export const updateDishApi = async (props: PropsUpdate) => {
  const { dishId, dishRequest, file } = props;
  const formData = new FormData();

  // JSON stringify object
  formData.append(
    "data",
    new Blob([JSON.stringify(dishRequest)], {
      type: "application/json",
    }),
  );

  // file
  if (file) {
    formData.append("file", file);
  }

  const response = await http.put<ApiResponse>(`/dishes/${dishId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Api lấy chi tiết món ăn
export const getDishDetailApi = async (dishId: string) => {
  const res = await http.get<ApiResponse<DishDetailResponse>>(
    `/dishes/${dishId}`,
  );
  return res.data;
};

// Api cập nhật trạng thái món ăn
export const updateDishStatusApi = async (dishId: string) => {
  return (await http.put<ApiResponse>(`/dishes/${dishId}/status`)).data;
};

// Api lấy danh sách món ăn gợi ý
export const getAllDishesRecommendApi = async (dishIds: string[]) => {
  const res = await http.get<ApiResponse<DishResponse[]>>(`/dishes/recommend?dishIds=${dishIds}`);
  return res.data;
}