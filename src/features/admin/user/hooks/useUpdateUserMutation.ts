import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserApi } from "../api/update-user";

type Payload = {
  userId: string;
  fullName: string;
  phoneNumber: string;
  gender: number;
  roleName: string;
};

export const useUpdateUserMutation = ({ onDone }: { onDone: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Payload) =>
      updateUserApi(payload.userId, {
        fullName: payload.fullName,
        phoneNumber: payload.phoneNumber,
        gender: payload.gender,
        roleName: payload.roleName,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      onDone?.();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
