import OrderCard from "../components/OrderCard";
import { useConfirmItemSocket } from "../hooks/useConfirmItemSocket";
import { useGetOrdersPending } from "../hooks/useGetOrdersPending";
import { useGetOrdersSocket } from "../hooks/useGetOrdersSocket";
import type { OrderType } from "../types/order";

const ChefOrderRoute = () => {
  // Gọi hook api lấy danh sách hóa đơn gọi món
  const { data } = useGetOrdersPending();
  const orders = data?.data || [];

  useGetOrdersSocket();

  useConfirmItemSocket();

  return (
    <div className="px-5 my-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {orders.map((order: OrderType) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default ChefOrderRoute;
