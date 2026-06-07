import { http } from "../../../../app/api/http";

export const updateNoteItemApi = async (orderItemId: string, notes: string) => {
  const res = await http.put(`/orders/orderItem/notes/${orderItemId}`, {
    notes,
  });
  return res.data;
};
