import { useQuery } from "@tanstack/react-query";
import { getAllDiningTables } from "../api/dine.table.api";
import type { TableStatus } from "../types/tableStatus";

export const useDiningTable = (status: TableStatus) => {
  return useQuery({
    queryKey: ["diningTables", status],
    queryFn: () => getAllDiningTables(status),
  });
};
