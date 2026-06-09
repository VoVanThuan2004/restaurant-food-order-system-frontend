import { useQuery } from "@tanstack/react-query";
import { getOrdersByAdmin } from "../../services/order.api";

type OrderAdminProps = {
  page: number;
  size: number;
  startDate?: string;
  endDate?: string;
  userId?: string;
  status?: boolean;
};

export const useOrdersAdmin = (props: OrderAdminProps) => {
  return useQuery({
    queryKey: ["orders-admin", props],
    queryFn: () => getOrdersByAdmin(props),
    placeholderData: (previousData) => previousData,
  });
};
