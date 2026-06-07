import { http } from "../../../app/api/http";

export const getProfileApi = async () => {
    const res = await http.get("/auth/users/");
    return res.data;
}