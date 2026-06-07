import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDineTableApi } from "../api/add-dine-table";
import type { DineTableDTO } from "../types/dine-table";

export const useAddDineTableMutation = ({ onDone }: { onDone: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dineTable: DineTableDTO) => addDineTableApi(dineTable),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-dine-tables"] });
      onDone?.();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
