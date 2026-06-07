import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { socket } from "../../../../utils/socket";

type Payload = {
  _id: string;
  status: boolean;
};


export const useDiningTableSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.emit("join_dining_table");

    socket.on("join_dining_table", (payload: Payload) => {
      console.log(payload);
      queryClient.invalidateQueries({
        queryKey: ["diningTables"],
      });
    });

    return () => {
      socket.off("join_dining_table");
    };
  }, [queryClient]);
};
