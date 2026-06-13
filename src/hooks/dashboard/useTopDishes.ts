import { useEffect, useState } from "react";
import { getTopDishesApi } from "../../services/dashboard.api";
import type { TopDishesResponse } from "../../types/dashboard.type";

type Props = {
  limit?: number;
  startDate: string;
  endDate: string;
};

export const useTopDishes = (props: Props) => {
  const { limit, startDate, endDate } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TopDishesResponse[]>([]);

  const fetchTopDishes = async () => {
    if (!startDate || !endDate) {
        return;
    }
    setIsLoading(true);
    try {
      const res = await getTopDishesApi({
        limit,
        startDate,
        endDate,
      });

      setData(res.data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopDishes();
  }, [limit, startDate, endDate]);

  return { isLoading, data };
};
