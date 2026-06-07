import { useQuery } from "@tanstack/react-query";
import { getMenuApi } from "../api/get-menu";

export const useMenuByCategory = ({ categoryId }: { categoryId: string | null }) => {
  return useQuery({
    queryFn: () => getMenuApi(categoryId),
    queryKey: ["admin-menus", categoryId],
  });
};
