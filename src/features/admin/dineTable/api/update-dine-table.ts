import { http } from "../../../../app/api/http";
import type { DineTableUpdateDTO } from "../types/dine-table";

export const updateDineTableApi = async (
  tableId: string,
  dineTable: DineTableUpdateDTO,
) => {
  const res = await http.put(`/tables/${tableId}`, dineTable);
  return res.data;
};
