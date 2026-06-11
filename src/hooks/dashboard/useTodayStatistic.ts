import { useEffect, useState } from "react";
import type { TodayStatisticResponse } from "../../types/dashboard.type";
import { getTodayStatisticApi } from "../../services/dashboard.api";

export const useTodayStatistic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TodayStatisticResponse>();

  useEffect(() => {
    const fetchTodayStatistic = async () => {
      setIsLoading(true);
      try {
        const res = await getTodayStatisticApi();

        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodayStatistic();
  }, []);

  return { isLoading, data };
};
