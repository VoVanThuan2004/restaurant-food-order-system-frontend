import { http } from "../../../../app/api/http"
import type { UserForm } from "../types/user";

export const addUserApi = async (user: UserForm) => {
    const res = await http.post("/auth/users/admin/", user);
    return res.data;
}