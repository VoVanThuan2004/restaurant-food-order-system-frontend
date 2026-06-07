import { useInfiniteQuery } from "@tanstack/react-query";
import { getChefOrdersApi } from "../../services/order.api";

type Props = {
  size: number;
};
export const useOrdersChef = (props: Props) => {
  const { size } = props;
  return useInfiniteQuery({
    queryKey: ["infinite-chef-orders", size],

    queryFn: async ({ pageParam = 0 }) => {
      return getChefOrdersApi({
        page: pageParam,
        size,
      });
    },

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      // Giả sử response của bạn có cấu trúc Spring Boot Page
      if (lastPage?.data?.last || !lastPage?.data?.content) {
        return undefined; // Không còn trang tiếp theo
      }
      return lastPage.data.number + 1; // current page + 1
    },

    placeholderData: (previousData) => previousData,
  });
};
