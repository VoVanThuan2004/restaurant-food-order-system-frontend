import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const usePlaceOrderSocket = () => {
  const queryClient = useQueryClient();
  const BE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // endpoint websocket của spring boot
    const socket = new SockJS(`${BE_URL}/ws`);

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        client.subscribe("/topic/place-order", () => {

          // refetch lại API
          queryClient.invalidateQueries({
            queryKey: ["infinite-chef-orders"],
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
