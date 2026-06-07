import type { OrderItem, OrderResponse } from "../../../types/order.type";
import { OrderItemInfo } from "./OrderItem";

type Props = {
  order: OrderResponse;
};

export const OrderCard = (props: Props) => {
  const { order } = props;
  return (
    <div className="w-full shadow-sm rounded-xl border border-gray-200 border-t-[8px] border-t-amber-500">
      {/* Thông tin chung */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-orange-600">
            {order.diningTableName}
          </h1>

          <span className="text-xs text-gray-500">
            Nhân viên: {order.staffName}
          </span>
        </div>
      </div>

      {/* Thông tin món ăn */}
      <div className="flex flex-col px-3 gap-4 my-4">
        {order.orderItems.map((item: OrderItem) => (
          <OrderItemInfo key={item.orderItemId} item={item} />
        ))}
      </div>
    </div>
  );
};
