import { Client } from "@stomp/stompjs";
import { useEffect } from "react";
import SockJS from "sockjs-client";
import type { OrderDetail } from "../../types/order.type";
import { produce } from "immer";
import type { ApiResponse } from "../../types/api.response";
import { useQueryClient } from "@tanstack/react-query";

export const useConfirmStatusSocket = (orderId: string) => {
  const queryClient = useQueryClient();
  const BE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // endpoint websocket
    const socket = new SockJS(`${BE_URL}/ws`);

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        client.subscribe(`/topic/confirm-item/${orderId}`, (message) => {
          const {
            orderItemId,
            currentStatus,
          }: {
            orderItemId: string;
            currentStatus: string;
          } = JSON.parse(message.body);          

          if (currentStatus !== "CANCELLED") {
            queryClient.setQueryData(
              ["order-detail", orderId],
              (oldData: ApiResponse<OrderDetail> | undefined) => {
                if (!oldData) return oldData;

                return produce(oldData, (draft) => {
                  const item = draft.data?.orderItems.find(
                    (item) => item.orderItemId === orderItemId,
                  );

                  if (item) {
                    item.currentStatus = currentStatus;
                  }
                });
              },
            );
          } else {
            // refetch lại api
            queryClient.invalidateQueries({
              queryKey: ["order-detail", orderId],
            });
          }
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
