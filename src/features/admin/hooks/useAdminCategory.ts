import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "../category/api/admin-category";

export const useAdminCategory = () => {
  return useQuery({
    queryFn: () => fetchAllCategories(),
    queryKey: ["admin-categories"],
  });
};
