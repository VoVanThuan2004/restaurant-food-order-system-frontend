import { useQuery } from "@tanstack/react-query";
import { getAllDishesApi } from "../../services/dish.api";

type Props = {
  categoryId?: string;
  page: number;
  size: number;
};

export const useAdminDish = (props: Props) => {
  return useQuery({
    queryKey: ["admin-dishes", props],
    queryFn: () => getAllDishesApi(props),
    placeholderData: (previousData) => previousData,
  });
};
