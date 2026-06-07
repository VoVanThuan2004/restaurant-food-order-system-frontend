import { OrderCard } from "./OrderCard";
import type { OrderResponse } from "../../../types/order.type";
import { useOrdersChef } from "../../../hooks/order/useOrdersChef";
import { usePlaceOrderSocket } from "../../../hooks/order/usePlaceOrderSocket";
import Spinner from "../../../components/Spinner";
import { Empty } from "antd";
import { useRef, useEffect } from "react";

export const OrderChefPage = () => {
  // Gọi hook api lấy danh sách đơn gọi món
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useOrdersChef({
      size: 10,
    });
  const orders = data?.pages.flatMap((page) => page?.data?.content) || [];
  const lastElementRef = useRef<HTMLDivElement>(null);

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !isLoading
        ) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  usePlaceOrderSocket();

  return (
    <div className="px-5 my-5">
      <div className="relative min-h-[400px] mt-5">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Spinner color="#f97316" />
          </div>
        )}

        {!isLoading && orders.length === 0 && (
          <div className="flex justify-center items-center h-[300px]">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Không có đơn gọi món ăn"
            />
          </div>
        )}

        {!isLoading && orders.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {orders
              .filter((order): order is OrderResponse => order !== undefined)
              .map((order: OrderResponse) => (
                <OrderCard key={order.orderId} order={order} />
              ))}
            {/* Infinite scroll trigger element */}
            <div ref={lastElementRef} className="h-10" />
          </div>
        )}

        {/* Loading indicator for next page */}
        {isFetchingNextPage && (
          <div className="flex justify-center items-center py-5">
            <Spinner color="#f97316" />
          </div>
        )}
      </div>
    </div>
  );
};
