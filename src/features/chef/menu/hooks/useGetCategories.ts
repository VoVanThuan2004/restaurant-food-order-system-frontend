import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi } from "../api/get-categories";

export const useGetCategories = () => {
  return useQuery({
    queryFn: () => getCategoriesApi(),
    queryKey: ["chef-categories"],
  });
};
