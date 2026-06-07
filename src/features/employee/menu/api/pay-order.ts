import { http } from "../../../../app/api/http";
import type { PaymentDTO } from "../types/payment";

export const payOrderApi = async (paymentDTO: PaymentDTO) => {
  const res = await http.post("/orders/payment/", paymentDTO);
  return res.data;
};
