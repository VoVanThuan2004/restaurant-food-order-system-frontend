import { useInfiniteQuery } from "@tanstack/react-query";
import { getStaffOrdersApi } from "../../services/order.api";

type Props = {
  staffId: string;
  size: number;
};

export const useOrderPayment = (props: Props) => {
  const { staffId, size } = props;
  return useInfiniteQuery({
    queryKey: ["infinite-staff-orders", size],

    queryFn: async ({ pageParam = 0 }) => {
      return getStaffOrdersApi({
        staffId,
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
