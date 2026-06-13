import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { formatPrice } from "../../../utils/formatPrice";
import { Banknote, ClipboardList } from "lucide-react";
import { RevenueChart } from "./RevenueChart";
import { useTodayStatistic } from "../../../hooks/dashboard/useTodayStatistic";
import { useRevenueStatistic } from "../../../hooks/dashboard/useRevenueStatistic";
import type { RevenueStatisticResponse } from "../../../types/dashboard.type";
import { useTopDishes } from "../../../hooks/dashboard/useTopDishes";
import TopDishesPieChart from "./TopDishesPieChart";

export const DashboardPage = () => {
  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState<any>([
    dayjs().subtract(1, "month"),
    dayjs(),
  ]);
  const [groupBy, setGroupBy] = useState<"YEAR" | "QUARTER" | "MONTH" | "WEEK">(
    "MONTH",
  );
  // Convert sang start date, end date
  const startDate = dateRange?.[0]?.format("YYYY-MM-DD");
  const endDate = dateRange?.[1]?.format("YYYY-MM-DD");

  // Gọi hook api trả về thống kê hôm nay
  const { isLoading, data: stats } = useTodayStatistic();

  // Gọi hook api trả về thống kế doanh thu
  const { data, isLoading: isLoadingStats } = useRevenueStatistic({
    startDate,
    endDate,
    type: groupBy,
  });

  // Gọi hook api trả về top các món ăn bán chạy
  const { data: topDishesData, isLoading: isLoadingTopDishes } = useTopDishes({
    limit: 5,
    startDate,
    endDate,
  });

  console.log("Data: ", topDishesData);
  

  const isAnyLoading = isLoading || isLoadingStats;

  return (
    <div className="px-5 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card: Tổng doanh thu hôm nay */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Tổng doanh thu hôm nay</p>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Banknote className="w-5 h-5 text-blue-500" />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              <div className="h-5 w-3/4 rounded-full bg-slate-200/80 animate-pulse" />
              <div className="h-8 w-1/2 rounded-full bg-slate-200/80 animate-pulse" />
            </div>
          ) : (
            <p className="text-2xl font-semibold text-gray-800">
              {formatPrice(stats?.totalRevenue || 0)}
            </p>
          )}
        </div>

        {/* Card: Tổng bệnh nhân hôm nay */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Tổng số đơn gọi món</p>
            <div className="p-2 bg-green-50 rounded-lg">
              <ClipboardList className="w-5 h-5 text-green-500" />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              <div className="h-5 w-1/3 rounded-full bg-slate-200/80 animate-pulse" />
              <div className="h-8 w-1/4 rounded-full bg-slate-200/80 animate-pulse" />
            </div>
          ) : (
            <p className="text-2xl font-semibold text-gray-800">
              {stats?.totalOrders || 0}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3 mt-7">
        {/* Range Date */}
        <RangePicker
          className="w-full md:w-auto h-[45px]"
          placeholder={["Từ ngày", "Đến ngày"]}
          format="DD/MM/YYYY"
          value={dateRange}
          onChange={(dates) => setDateRange(dates)}
          disabled={isAnyLoading}
        />

        {/* Group By */}
        <Select
          placeholder="Chọn kiểu thống kê"
          className="w-full md:w-[200px] h-[45px]"
          value={groupBy}
          onChange={(value) => setGroupBy(value)}
          options={[
            { value: "YEAR", label: "Theo năm" },
            { value: "QUARTER", label: "Theo quý" },
            { value: "MONTH", label: "Theo tháng" },
            { value: "WEEK", label: "Theo tuần" },
          ]}
          disabled={isAnyLoading}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RevenueChart
          data={data as RevenueStatisticResponse[]}
          loading={isLoading || isLoadingStats}
        />
        <TopDishesPieChart
          data={topDishesData ?? []}
          loading={isLoading || isLoadingTopDishes}
        />
      </div>
    </div>
  );
};
