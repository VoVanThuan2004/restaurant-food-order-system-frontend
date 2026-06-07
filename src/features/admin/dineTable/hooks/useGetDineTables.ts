import { useQuery } from "@tanstack/react-query";
import { getDineTablesApi } from "../api/get-dine-tables";

export const useGetDineTables = () => {
  return useQuery({
    queryFn: () => getDineTablesApi(),
    queryKey: ["admin-dine-tables"],
  });
};
