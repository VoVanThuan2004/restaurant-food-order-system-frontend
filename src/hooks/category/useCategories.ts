import { useQuery } from "@tanstack/react-query";
import { getAllCategoriesApi } from "../../services/category.api";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategoriesApi(),
    placeholderData: (previousData) => previousData,
  });
};
