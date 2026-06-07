import { useQuery } from "@tanstack/react-query";
import { getAllOrdersPendingApi } from "../api/get-orders";

export const useGetOrdersPending = () => {
  return useQuery({
    queryFn: () => getAllOrdersPendingApi(),
    queryKey: ["chef-orders-pending"],
  });
};
