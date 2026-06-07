import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const useDiningTableSocket = () => {
  const queryClient = useQueryClient();
  const BE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // endpoint websocket của spring boot
    const socket = new SockJS(`${BE_URL}/ws`);

    const client = new Client({
      webSocketFactory: () => socket,

      reconnectDelay: 5000,

      onConnect: () => {
        console.log("Connected websocket");

        client.subscribe("/topic/dining-table-status", (message) => {
          const updatedTable = JSON.parse(message.body);

          console.log("Dining table updated:", updatedTable);

          // refetch lại API
          queryClient.invalidateQueries({
            queryKey: ["diningTables"],
          });
        });
      },

      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [queryClient]);
};
