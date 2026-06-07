import { http } from "../../../../app/api/http";
import type { DineTableDTO } from "../types/dine-table";

export const addDineTableApi = async (dineTable: DineTableDTO) => {
  const res = await http.post("/tables", dineTable);
  return res.data;
};
