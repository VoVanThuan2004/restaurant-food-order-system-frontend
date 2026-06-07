import { fetchAllMenusByCategory } from "../api/menu.api";
import { useQuery } from "@tanstack/react-query";

export const useMenu = ({ categoryId }: { categoryId: string }) => {
  return useQuery({
    queryFn: () => fetchAllMenusByCategory(categoryId),
    queryKey: ["menus", categoryId],
  });
};
