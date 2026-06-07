import { fetchAllCategories } from "../api/category.api";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryFn: () => fetchAllCategories(),
    queryKey: ["categories"]
  })
};
