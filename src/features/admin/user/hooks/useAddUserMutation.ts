import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserApi } from "../api/add-user";
import type { UserForm } from "../types/user";

export const useAddUserMutation = ({ onDone }: { onDone: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: UserForm) => addUserApi(user),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      onDone?.();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
