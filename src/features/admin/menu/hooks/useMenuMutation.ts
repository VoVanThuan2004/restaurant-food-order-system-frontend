import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMenu } from "../api/add-menu";
import type { MenuDTO, MenuUpdateDTO } from "../types/menu";
import { deleteMenu } from "../api/delete-menu";
import { updateMenu } from "../api/update-menu";

export const useAddMenuMutation = ({ categoryId, onDone }: { categoryId: string | null, onDone: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (menu: MenuDTO) => addMenu(menu),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-menus", categoryId ?? null] });

      onDone?.();
    },
    onError: (error) => {
      console.error("Lỗi:", error);
    },
  });
};

export const useUpdateMenuMutation = ({ categoryId, onDone }: { categoryId: string | null, onDone: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (menu: MenuUpdateDTO) => updateMenu(menu),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-menus", categoryId ?? null] });
      
      onDone?.();
    },
    onError: (error) => {
      console.error("Lỗi:", error);
    },
  });
};

export const useDeleteMenuMutation = ({ categoryId }: { categoryId: string | null }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (menuId: string) => deleteMenu(menuId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-menus", categoryId ?? null] });
    },
    onError: (error) => {
      console.error("Lỗi:", error);
    },
  });
};
