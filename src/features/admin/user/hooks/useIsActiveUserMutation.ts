import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isActiveUserApi } from "../api/active-user";

export const useIsActiveUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => isActiveUserApi(userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
