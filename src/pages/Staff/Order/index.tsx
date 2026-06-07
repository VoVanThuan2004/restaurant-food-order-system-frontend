import Spinner from "../../../components/Spinner";
import { useOrderPayment } from "../../../hooks/order/useOrderPayment";
import useAuthStore from "../../../stores/useAuthStore";
import type { OrderPaymentResponse } from "../../../types/order.type";
import { OrderCard } from "./OrderCard";

export const StaffOrderPage = () => {
  const userId = useAuthStore((state) => state.user?.userId);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useOrderPayment({
      staffId: userId as string,
      size: 12,
    });

  const orders = data?.pages.flatMap((page) => page?.data?.content) ?? [];

  return (
    <div className="px-5">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Spinner color="#fb2c36" />
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders
          .filter((order): order is OrderPaymentResponse => order !== undefined)
          .map((order) => (
            <OrderCard key={order?.orderId} {...order} />
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
