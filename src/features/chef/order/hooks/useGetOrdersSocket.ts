import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { socket } from "../../../../utils/socket";

export const useGetOrdersSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.emit("join_orders_pending");

    socket.on("join_orders_pending", () => {
      queryClient.invalidateQueries({ queryKey: ["chef-orders-pending"] });
    });

    return () => {
      socket.off("join_orders_pending");
    };
  }, [queryClient]);
};
