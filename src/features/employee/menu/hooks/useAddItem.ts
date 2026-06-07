import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMenuToOrderApi } from "../api/add-menu-order";
import type { MenuDTO } from "../types/menu.type";
import type { AxiosError } from "axios";
import type { ApiError } from "../../../../types/api.error";
import { message } from "antd";
import type { ApiResponse } from "../../../../types/api.response";
import { useTotalItemsStore } from "../stores/useTotalItemsStore";

export const useAddItem = () => {
  const queryClient = useQueryClient();

  const setTotalItems = useTotalItemsStore((state) => state.setTotalItems);

  return useMutation({
    mutationFn: (menu: MenuDTO) => addMenuToOrderApi(menu),
    onSuccess: (data: ApiResponse<number>) => {
      queryClient.invalidateQueries({ queryKey: ["order-items"] });

      // Cập nhật global state cho tổng số items trong cart
      setTotalItems(data?.data || 0);

      message.success("Món ăn đã thêm vào giỏ hàng");
    },
    onError: (error: AxiosError<ApiError>) => {
      const errMessage = error.response?.data.message || "Lỗi hệ thống";
      message.error(errMessage);

      console.log(error);
    },
  });
};
