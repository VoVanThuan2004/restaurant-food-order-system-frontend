import { http } from "../../../app/api/http"
import type { ChangePasswordDTO } from "../types/auth.type";

export const changePasswordApi = async (data: ChangePasswordDTO) => {
    const res = await http.put("/auth/change-password", data);
    return res.data;
}