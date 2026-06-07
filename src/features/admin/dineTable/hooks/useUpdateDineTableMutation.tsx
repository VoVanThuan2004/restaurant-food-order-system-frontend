import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDineTableApi } from "../api/update-dine-table";

type Payload = {
  dineTableId: string;
  tableName: string;
  quantity: number;
};

export const useUpdateDineTableMutation = ({
  onDone,
}: {
  onDone: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Payload) =>
      updateDineTableApi(payload.dineTableId, {
        tableName: payload.tableName,
        quantity: payload.quantity
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-dine-tables"] });
      onDone?.();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
