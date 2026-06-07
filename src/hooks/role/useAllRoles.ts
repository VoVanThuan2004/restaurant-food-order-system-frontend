import { useQuery } from "@tanstack/react-query";
import { getAllRoleOptionsApi } from "../../services/role.api";

export const useAllRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getAllRoleOptionsApi,
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};
