import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { socket } from "../../../../utils/socket";

type Payload = {
  menuId: string;
  status: boolean;
};

export const useMenuStatusSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.emit("join_menu");

    socket.on("menu_status_updated", (payload: Payload) => {
      console.log(payload);

      queryClient.invalidateQueries({ queryKey: ["menus"] });
    });

    return () => {
      socket.off("menu_status_updated")
    }
  }, [queryClient]);
};
