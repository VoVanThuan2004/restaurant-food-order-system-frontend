import OrderCard from "../components/OrderCard";
import Spinner from "../../../../components/Spinner";
import { useGetOrders } from "../hooks/useGetOrders";

const OrderRoute = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetOrders();

  const orders = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="px-5">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Spinner color="#fb2c36" />
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <OrderCard key={order._id} {...order} />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => fetchNextPage()}
            className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
          >
            {isFetchingNextPage ? "Đang tải..." : "Xem thêm"}
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderRoute;
