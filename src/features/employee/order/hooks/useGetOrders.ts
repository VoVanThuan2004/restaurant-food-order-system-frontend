import { useInfiniteQuery } from "@tanstack/react-query";
import { getOrdersApi } from "../api/get-orders";

export const useGetOrders = () => {
  return useInfiniteQuery({
    queryKey: ["orders-history"],
    queryFn: ({ pageParam = 1 }) => getOrdersApi(pageParam, 3),
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination.page;
      const totalPages = lastPage.pagination.totalPages;

      if (currentPage < totalPages) {
        return currentPage + 1;
      }

      return undefined;
    },
  });
};
