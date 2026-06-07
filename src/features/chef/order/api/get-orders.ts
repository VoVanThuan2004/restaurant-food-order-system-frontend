import { http } from "../../../../app/api/http";

export const getAllOrdersPendingApi = async () => {
  const res = await http.get("/orders-pending/");
  return res.data;
};
