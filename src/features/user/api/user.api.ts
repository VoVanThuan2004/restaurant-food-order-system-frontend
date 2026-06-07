import { http } from "../../../app/api/http"
import type { ApiResponse } from "../../../types/api.response";
import type { ProfileData } from "../types/user.type";

export const fetchProfile = async () => {
    const res = await http.get<ApiResponse<ProfileData>>("/auth/users/");
    return res.data;
}