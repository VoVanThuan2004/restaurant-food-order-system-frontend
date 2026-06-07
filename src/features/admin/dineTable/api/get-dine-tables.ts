import { http } from "../../../../app/api/http";

export const getDineTablesApi = async () => {
  const res = await http.get("/tables");
  return res.data;
};
