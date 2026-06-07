import type { ItemStatus } from "../constants/item-status";
import { ITEM_STATUS_CONFIG } from "../constants/item-status-config";
import { ITEM_STATUS_FLOW } from "../constants/item-status-flow";

export const getItemStatusOptions = (currentStatus: ItemStatus) => {
  const currentIndex = ITEM_STATUS_FLOW.indexOf(currentStatus);

  return ITEM_STATUS_FLOW.map((status, index) => ({
    value: status,
    label: ITEM_STATUS_CONFIG[status].label,
    disabled: index < currentIndex,
  }));
};