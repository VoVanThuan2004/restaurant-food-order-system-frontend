import { http } from "../app/api/http";
import type { ApiResponse } from "../types/api.response";
import type {
  RevenueStatisticResponse,
  TodayStatisticResponse,
  TopDishesResponse,
} from "../types/dashboard.type";

export const getTodayStatisticApi = async () => {
  const res =
    await http.get<ApiResponse<TodayStatisticResponse>>("/dashboards/today");
  return res.data;
};

export const getRevenuStatisticApi = async ({
  startDate,
  endDate,
  type,
}: {
  startDate: string;
  endDate: string;
  type: string;
}) => {
  const queryParams: Record<string, string> = {
    type: type,
  };

  if (startDate && endDate) {
    queryParams.startDate = startDate;
    queryParams.endDate = endDate;
  }

  const res = await http.get<ApiResponse<RevenueStatisticResponse[]>>(
    "/dashboards/statistics/revenue",
    {
      params: queryParams,
    },
  );
  return res.data;
};

export const getTopDishesApi = async ({
  limit,
  startDate,
  endDate,
}: {
  limit?: number;
  startDate: string;
  endDate: string;
}) => {
  const queryParams: Record<string, any> = {
    startDate,
    endDate,
  };

  if (limit) queryParams.limit = limit;

  const res = await http.get<ApiResponse<TopDishesResponse[]>>(
    "/dashboards/top-dishes",
    {
      params: queryParams
    }
  );
  return res.data;
};
