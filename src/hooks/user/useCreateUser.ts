import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewUserApi } from "../../services/user.api";
import type { UserRequest } from "../../types/user.type";
import { message } from "antd";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: UserRequest) => addNewUserApi(user),
    onSuccess: () => {
      message.success("Thêm người dùng thành công!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Thêm người dùng thất bại";
      message.error(errorMessage);
    },
  });
};
