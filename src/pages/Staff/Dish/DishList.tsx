import { useEffect, useRef, useState } from "react";
import type { DishResponse } from "../../../types/dish.type";
import { DishCard } from "./DishCard";
import { useDishes } from "../../../hooks/dish/useDishes";
import { DishDetailDrawer } from "./DishDetailDrawer";
import { useAddOrderItem } from "../../../hooks/order/useAddOrderItem";
import type { OrderItemRequest } from "../../../types/order.type";
import { useDishSocket } from "../../../hooks/dish/useDishSocket";
import { useTotalItemsStore } from "../../../stores/useTotalItemsStore";

type Props = {
  categoryId: string | null;
};

export const DishList = ({ categoryId }: Props) => {
  const [open, setOpen]= useState(false); // State quản lý đóng mở drawer xem chi tiết
  const [dishId, setDishId] = useState("");
  const observerTarget = useRef<HTMLDivElement>(null);

  const addToOrder = useTotalItemsStore((state) => state.addToOrder);

  // Hook socket cập nhật trạng thái món ăn
  useDishSocket();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDishes({
    ...(categoryId && {
      categoryId,
    }),
    size: 12,
  });

  // merge toàn bộ pages
  const dishes: DishResponse[] =
    data?.pages
      .flatMap((page) => page?.data?.content ?? [])
      .filter((dish): dish is DishResponse => dish !== undefined) || [];
  

  useEffect(() => {
    const currentTarget = observerTarget.current;

    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(currentTarget);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

   // Gọi hook thêm món ăn vào đơn gọi món
    const addOrderItemMutation = useAddOrderItem();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Lỗi tải món ăn</div>;
  }


  const onOpenDrawer = (dishId: string) => {
    setOpen(true);
    setDishId(dishId);
  }

  const onCloseDrawer = () => {
    setOpen(false);
  }

  const onAddOrderItem = (item: OrderItemRequest) => {
    addOrderItemMutation.mutate(item, {
      onSuccess: () => {
        addToOrder();
        onCloseDrawer();
      },
    });
  }

  return (
    <div className="px-5">
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dishes.map((dish) => (
          <DishCard key={dish.dishId} dish={dish} onOpenDrawer={onOpenDrawer}/>
        ))}
      </div>

      {/* sentinel */}
      <div ref={observerTarget} className="py-8 flex justify-center">
        {isFetchingNextPage && (
          <p className="text-gray-500">Đang tải thêm...</p>
        )}
      </div>

      {!hasNextPage && dishes.length > 0 && (
        <div className="text-center text-gray-500 py-6">
          Đã hiển thị tất cả món ăn
        </div>
      )}

      {/* Hiển thị drawer chi tiết món ăn */}

      <DishDetailDrawer 
        open={open}
        dishId={dishId}
        onClose={onCloseDrawer}
        onAddToOrder={onAddOrderItem}
      />
    </div>
  );
};
