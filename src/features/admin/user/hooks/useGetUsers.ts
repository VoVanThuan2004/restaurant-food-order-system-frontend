import { useQuery } from "@tanstack/react-query";
import { getUsersApi } from "../api/get-user";

export const useGetUsers = (page: number, limit: number) => {
  return useQuery({
    queryFn: () => getUsersApi(page, limit),
    queryKey: ["admin-users", page, limit],
    placeholderData: (previousData) => previousData,
  });
};
