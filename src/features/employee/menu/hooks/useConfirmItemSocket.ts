import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { socket } from "../../../../utils/socket";

export const useConfirmItemSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.emit("join_order_item_status");

    socket.off("order_item_status_updated");

    socket.on("order_item_status_updated", () => {
      queryClient.invalidateQueries({ queryKey: ["order-items"] });
    });

    return () => {
      socket.off("order_item_status_updated");
    };
  }, [queryClient]);
};
