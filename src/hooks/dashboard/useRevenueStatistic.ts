import { useEffect, useState } from "react";
import type { RevenueStatisticResponse } from "../../types/dashboard.type";
import { getRevenuStatisticApi } from "../../services/dashboard.api";

type Props = {
    startDate: string;
    endDate: string;
    type: string;
}
export const useRevenueStatistic = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<RevenueStatisticResponse[]>();
  const { startDate, endDate, type } = props;

  useEffect(() => {
    const fetchTodayStatistic = async () => {
      setIsLoading(true);
      try {
        const res = await getRevenuStatisticApi(props);

        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodayStatistic();
  }, [startDate, endDate, type]);

  return { isLoading, data };
};
