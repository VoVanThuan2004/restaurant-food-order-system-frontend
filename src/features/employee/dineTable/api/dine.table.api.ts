import { http } from "../../../../app/api/http";
import type { TableStatus } from "../types/tableStatus";

export const getAllDiningTables = async (status: TableStatus) => {
  const res = await http.get(`/tables?status=${status}`);
  return res.data;
};
