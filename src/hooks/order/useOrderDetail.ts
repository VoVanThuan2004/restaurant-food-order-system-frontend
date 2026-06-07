import { useQuery } from "@tanstack/react-query";
import { getOrderDetailApi } from "../../services/order.api";

export const useOrderDetail = (orderId: string) => {
  return useQuery({
    queryFn: () => getOrderDetailApi(orderId),
    queryKey: ["order-detail", orderId],
    enabled: !!orderId,
  });
};
