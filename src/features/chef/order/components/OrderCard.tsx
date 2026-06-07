import type { OrderType } from "../types/order";
import type { OrderItemType } from "../types/order-item";
import OrderItem from "./OrderItem";

type Props = {
  order: OrderType;
};

const OrderCard = (props: Props) => {
  return (
    <div className="w-full shadow-sm rounded-xl border border-gray-200 border-t-[8px] border-t-amber-500">
      {/* Thông tin chung */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-orange-600">{props.order.diningTableName}</h1>

          <span className="text-xs text-gray-500">Staff: {props.order.waiter}</span>
        </div>
      </div>

      {/* Thông tin món ăn */}
      <div className="flex flex-col px-3 gap-4 my-4">
        {props.order.orderItems.map((item: OrderItemType) => (
            <OrderItem key={item._id} item={item}/>
        ))}
        
      </div>
    </div>
  );
};

export default OrderCard;
