import { http } from "../../../../app/api/http";

export const deleteDineTableApi = async (dineTableId: string) => {
  const res = await http.delete(`/tables/${dineTableId}`);
  return res.data;
};
