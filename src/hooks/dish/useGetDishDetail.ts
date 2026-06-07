import { useState } from "react";
import type { DishDetailResponse } from "../../types/dish.type";
import { getDishDetailApi } from "../../services/dish.api";
import { getApiError } from "../../utils/get-api-error";
import { message } from "antd";

type Props = {
  dishId: string;
  onClose: () => void;
};

export const useGetDishDetail = (props: Props) => {
  const { dishId, onClose } = props;
  const [dish, setDish] = useState<DishDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDishDetail = async () => {
    setLoading(true);
    try {
      const res = await getDishDetailApi(dishId);

      setDish(res.data as DishDetailResponse);
    } catch (error) {
      const apiError = getApiError(error);
      message.error(
        apiError.message || "Lỗi khi tải thông tin chi tiết món ăn",
      );
      onClose();
    } finally {
      setLoading(false);
    }
  };
};
