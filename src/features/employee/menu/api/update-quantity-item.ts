import { http } from "../../../../app/api/http";

export const updateQuantityItemApi = async ({
  orderItemId,
  newQuantity,
}: {
  orderItemId: string;
  newQuantity: number;
}) => {
  const res = await http.put(`/orders/update/quantity/${orderItemId}`, {
    newQuantity,
  });
  return res.data;
};
