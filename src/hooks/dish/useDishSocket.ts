import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { DishResponse } from "../../types/dish.type";
import { produce } from "immer";

export const useDishSocket = () => {
  const queryClient = useQueryClient();
  const BE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // endpoint websocket
    const socket = new SockJS(`${BE_URL}/ws`);

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        client.subscribe("/topic/dish-status", (message) => {
          const { dishId, status } = JSON.parse(message.body);

          queryClient.setQueriesData(
            { queryKey: ["infinite-dishes"], type: "active" },
            (oldData: any) => {
              if (!oldData) return oldData;

              return produce(oldData, (draft: any) => {
                draft.pages.forEach((page: any) => {
                  const dish = page.data.content.find(
                    (d: DishResponse) => d.dishId === dishId,
                  );
                  if (dish) {
                    dish.status = status;
                  }
                });
              });
            },
          );
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
