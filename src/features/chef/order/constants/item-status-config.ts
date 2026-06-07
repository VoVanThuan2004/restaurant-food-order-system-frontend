import { ItemStatus } from "./item-status";


export const ITEM_STATUS_CONFIG = {
  [ItemStatus.PENDING]: {
    label: "Pending",
    color: "bg-gray-100 text-gray-600",
  },
  [ItemStatus.CONFIRMED]: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-600",
  },
  [ItemStatus.PREPARING]: {
    label: "Preparing",
    color: "bg-orange-100 text-orange-600",
  },
  [ItemStatus.READY]: {
    label: "Ready",
    color: "bg-green-100 text-green-600",
  },
  [ItemStatus.SERVED]: {
    label: "Served",
    color: "bg-emerald-100 text-emerald-600",
  },
//   [ItemStatus.CANCELED]: {
//     label: "Canceled",
//     color: "bg-red-100 text-red-600",
//   },
} as const;