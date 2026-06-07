import { useQuery } from "@tanstack/react-query";
import { getMenusByCategoryApi } from "../api/get-menus";

export const useGetMenus = (categoryId: string | null) => {
  return useQuery({
    queryFn: () => getMenusByCategoryApi(categoryId),
    queryKey: ["chef-menus", categoryId],
  });
};
