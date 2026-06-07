import { useQuery } from "@tanstack/react-query";
import { filterOrderApi } from "../api/filter-orders";
import type { FilterProps } from "../types/filter-props";

export const useFilterOrders = (props: FilterProps) => {
  return useQuery({
    queryFn: () => filterOrderApi(props),
    queryKey: ["admin-orders", props],
  });
};
