export const ORDER_ITEM_STATUS_UI: Record<string, any> = {
  NEW: {
    label: "Mới",
    className:
      "bg-slate-100 border-slate-300 text-slate-600",
  },

  PENDING: {
    label: "Chờ bếp nhận",
    className:
      "bg-yellow-100 border-yellow-300 text-yellow-700",
  },

  ACCEPTED: {
    label: "Đã nhận",
    className:
      "bg-blue-100 border-blue-300 text-blue-700",
  },

  PREPARING: {
    label: "Đang làm",
    className:
      "bg-orange-100 border-orange-300 text-orange-700",
  },

  READY: {
    label:
      "Hoàn thành",
    className:
      "bg-green-100 border-green-300 text-green-700",
  },

  SERVED: {
    label:
      "Đã phục vụ",
    className:
      "bg-emerald-100 border-emerald-300 text-emerald-700",
  },

  CANCELLED: {
    label: "Đã hủy",
    className:
      "bg-red-100 border-red-300 text-red-700",
  },
};