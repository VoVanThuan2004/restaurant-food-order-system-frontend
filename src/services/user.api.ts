import { http } from "../app/api/http";
import type { ApiResponse } from "../types/api.response";
import type { PageResponse } from "../types/page.response.type";
import type {
  UserProfileResponse,
  UserRequest,
  UserResponse,
} from "../types/user.type";

export const getUserProfileApi = async () => {
  const res =
    await http.get<ApiResponse<UserProfileResponse>>("/users/profile");
  return res.data;
};

// Lấy danh sách người dùng hệ thống
type Props = {
  page: number;
  size: number;
  search?: string;
};
export const getAllUsersApi = async (props: Props) => {
  const { page, size, search } = props;

  const queryParams: Record<string, any> = {
    page,
    size,
  };

  if (search) queryParams.search = search;

  const res = await http.get<ApiResponse<PageResponse<UserResponse>>>(
    `/users`,
    {
      params: queryParams,
    },
  );

  return res.data;
};

// Api thêm người dùng mới
export const addNewUserApi = async (user: UserRequest) => {
  const res = await http.post<ApiResponse>("/users", user);
  return res.data;
};

// Api cập nhật thông tin người dùng
type UserUpdateProps = {
  userId: string;
  user: UserRequest;
};

export const updateUserApi = async (props: UserUpdateProps) => {
  const { userId, user } = props;

  const res = await http.put<ApiResponse>(`/users/${userId}/admin`, user);
  return res.data;
};

// Api khóa người dùng
export const activeUserApi = async (userId: string) => {
  const res = await http.put<ApiResponse>(`/users/${userId}/active`);
  return res.data;
};
