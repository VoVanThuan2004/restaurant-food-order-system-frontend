import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { Loader2 } from "lucide-react";
import type { RevenueStatisticResponse } from "../../../types/dashboard.type";


type Props = {
  data: RevenueStatisticResponse[];
  loading: boolean;
};

export const RevenueChart = ({ data, loading }: Props) => {
  if (loading) {
    return (
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mt-5">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Thống kê doanh thu
        </h3>

        <div className="h-[420px] flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-gray-200 bg-slate-50/80">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          <span className="text-sm text-gray-500">Đang tải dữ liệu...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mt-5">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Thống kê doanh thu
      </h3>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="label"
            tick={{ fontSize: 12 }}
            interval={0}
          />

          <YAxis
            tickFormatter={(value) =>
              `${(value / 1000).toLocaleString()}k`
            }
          />

          <Tooltip
            formatter={(value) => [
              `${Number(value).toLocaleString()} đ`,
              "Doanh thu",
            ]}
          />

          <Legend />

          <Bar
            dataKey="revenue"
            name="Doanh thu"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
            barSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};