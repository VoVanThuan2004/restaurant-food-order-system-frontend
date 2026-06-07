import { useQuery } from "@tanstack/react-query";
import { getOrderItemsApi } from "../api/get-order-items";

export const useGetOrderItems = (orderId: string | null) => {
  return useQuery({
    queryFn: () => getOrderItemsApi(orderId),
    queryKey: ["order-items"],
  });
};
