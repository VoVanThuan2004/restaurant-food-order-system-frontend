import type { OrderItemType } from "./order-item";

export type OrderType = {
  _id: string;
  waiter: string;
  diningTableName: string;
  orderItems: OrderItemType[];
};
