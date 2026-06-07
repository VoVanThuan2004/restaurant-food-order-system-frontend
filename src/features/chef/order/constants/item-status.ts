export const ItemStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PREPARING: "PREPARING",
  READY: "READY",
  SERVED: "SERVED",
} as const;

export type ItemStatus = (typeof ItemStatus)[keyof typeof ItemStatus];
