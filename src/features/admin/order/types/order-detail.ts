import type { OrderItem } from "./order-item";

export type OrderDetailType = {
  orderId: string;
  waiter: string;
  diningTableName: string;
  amountReceived: number;
  changeAmount: number;
  totalPrice: number;
  status: string;
  paymentMethod: string;
  paymentTime: string;
  orderItems: OrderItem[]
};
