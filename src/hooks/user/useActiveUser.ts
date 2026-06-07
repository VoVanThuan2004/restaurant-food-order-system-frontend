import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activeUserApi } from "../../services/user.api";
import { getApiError } from "../../utils/get-api-error";
import { message } from "antd";

export const useActiveUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => activeUserApi(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      const apiError = getApiError(error);
      message.error(apiError.message);
    },
  });
};
