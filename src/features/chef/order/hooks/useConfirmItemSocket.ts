import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { socket } from "../../../../utils/socket";
import type { OrderType } from "../types/order";
import type { OrderItemType } from "../types/order-item";
import type { ApiResponse } from "../../../../types/api.response";

type Data = {
  orderId: string;
  orderItemId: string;
  currentStatus: string;
}

export const useConfirmItemSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.emit("join_order_item_status");

    const handler = (data: Data) => {
      const { orderId, orderItemId, currentStatus } = data;

      queryClient.setQueryData(["chef-orders-pending"], (oldData: ApiResponse<OrderType[]>) => {
        if (!oldData) return oldData;

        console.log(oldData);
        

        return {
          ...oldData,
          data: oldData.data?.map((order: OrderType) => {
            if (order._id !== orderId) return order;

            return {
              ...order,
              orderItems: order.orderItems.map((item: OrderItemType) =>
                item._id === orderItemId ? { ...item, currentStatus } : item,
              ),
            };
          }),
        };
      });
    };

    socket.on("order_item_status_updated", handler);

    return () => {
      socket.off("order_item_status_updated");
    };
  }, [queryClient]);
};
