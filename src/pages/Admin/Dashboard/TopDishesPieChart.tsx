import {
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import type { TopDishesResponse } from "../../../types/dashboard.type";

const skeletonRows = ["row-1", "row-2", "row-3", "row-4", "row-5"];

const generateColor = (index: number) => {
  const hue = (index * 35 + 200) % 360;

  return `hsl(${hue}, 80%, 60%)`;
};

export default function TopDishesPieChart({
  data,
  loading,
}: {
  readonly data: TopDishesResponse[];
  readonly loading: boolean;
}) {
  const totalQuantity = data.reduce((sum, item) => sum + item.totalQuantity, 0);

  const chartData = data.map((item, index) => ({
    name: item.dishName,
    value: item.totalQuantity,
    fill: generateColor(index),
    percent:
      totalQuantity === 0
        ? 0
        : Number(((item.totalQuantity / totalQuantity) * 100).toFixed(1)),
  }));

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mt-5">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          Top món ăn bán chạy
        </h2>

        <div className="space-y-4">
          {skeletonRows.map((row) => (
            <div key={row} className="space-y-2">
              <div className="h-4 rounded-full bg-slate-200 animate-pulse w-3/5" />
              <div className="h-3 rounded-full bg-slate-200 animate-pulse w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mt-5">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Top món ăn bán chạy
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Thống kê các món ăn được gọi nhiều nhất trong khoảng thời gian đã
            chọn.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          {data.length} món ăn
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] items-start">
        <div className="space-y-4">
          {chartData.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-800">{item.name}</span>

                <span className="text-sm font-semibold text-slate-600">
                  {item.value.toLocaleString()} lượt
                </span>
              </div>

              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percent}%`,
                    backgroundColor: item.fill,
                  }}
                />
              </div>

              <div className="mt-1 text-xs text-slate-500 text-right">
                {item.percent}%
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">
              Phân bố món ăn
            </span>

            <span className="text-sm text-slate-500">
              {totalQuantity.toLocaleString()} lượt gọi
            </span>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={95}
                  innerRadius={55}
                  paddingAngle={3}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toLocaleString()} lượt`,
                    "Số lượng",
                  ]}
                />

                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
