export const OrderItemStatus = {
  NEW: "NEW",
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  PREPARING: "PREPARING",
  READY: "READY",
  SERVED: "SERVED",
  CANCELLED: "CANCELLED",
} as const;

export type OrderItemStatus =
  (typeof OrderItemStatus)[keyof typeof OrderItemStatus];
