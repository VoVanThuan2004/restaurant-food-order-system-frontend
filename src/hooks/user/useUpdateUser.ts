import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import type { UserRequest } from "../../types/user.type";
import { updateUserApi } from "../../services/user.api";

type UserUpdateProps = {
  userId: string;
  user: UserRequest;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: UserUpdateProps) => updateUserApi(props),
    onSuccess: () => {
      message.success("Cập nhật thông tin người dùng thành công!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Thêm người dùng thất bại";
      message.error(errorMessage);
    },
  });
};
