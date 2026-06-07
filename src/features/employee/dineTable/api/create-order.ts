import { http } from "../../../../app/api/http"

export const createOrder = async (diningTableId: string) => {
    const res = await http.post(`/orders/${diningTableId}`);
    return res.data;
}