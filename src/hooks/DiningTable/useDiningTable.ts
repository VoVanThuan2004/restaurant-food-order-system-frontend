import { useQuery } from "@tanstack/react-query";
import type { TableStatus } from "../../types/dining-table.type";
import { getAllDiningTables } from "../../services/dining-table.api";

export const useDiningTable = (status: TableStatus) => {
  return useQuery({
    queryKey: ["diningTables", status],
    queryFn: () => getAllDiningTables(status),
  });
};