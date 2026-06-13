export type RevenueStatisticResponse = {
  label: string;
  revenue: number;
};

export type TodayStatisticResponse = {
  totalOrders: number;
  totalRevenue: number;
};

export type TopDishesResponse = {
  dishName: string;
  totalQuantity: number;
};
