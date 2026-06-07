import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllDishesApi } from "../../services/dish.api";

type Props = {
  categoryId?: string;
  size: number;
};

export const useDishes = (props: Props) => {
  const { categoryId, size } = props;
  return useInfiniteQuery({
    queryKey: ["infinite-dishes", categoryId, size],

    queryFn: async ({ pageParam = 0 }) => {
      return getAllDishesApi({
        page: pageParam,
        size: size,
        categoryId: categoryId || undefined,
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
