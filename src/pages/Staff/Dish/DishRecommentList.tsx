import { Skeleton } from "antd";
import type { OrderItem, OrderItemRequest } from "../../../types/order.type";
import { useEffect, useState } from "react";
import type { DishResponse } from "../../../types/dish.type";
import { getAllDishesRecommendApi } from "../../../services/dish.api";
import { DishDetailDrawer } from "./DishDetailDrawer";
import { useTotalItemsStore } from "../../../stores/useTotalItemsStore";
import { useAddOrderItem } from "../../../hooks/order/useAddOrderItem";
import formatCurrency from "../../../utils/formatCurrency";

type Props = {
  orderItems: OrderItem[];
};
export const DishRecommendList = (props: Props) => {
  const { orderItems } = props;
  const [loading, setLoading] = useState(true);
  const [recommendDishes, setRecommendDishes] = useState<DishResponse[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [dishId, setDishId] = useState<string>();

  const addToOrder = useTotalItemsStore((state) => state.addToOrder);

  const addOrderItemMutation = useAddOrderItem();

  // Hook gọi api lấy danh sách món ăn gợi ý
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (!orderItems.length) {
          return;
        }

        setLoading(true);

        const dishIds = orderItems
          .filter((item) => item.currentStatus !== "CANCELLED")
          .map((item) => item.dishId);

        if (!dishIds.length) {
          setRecommendDishes([]);
          return;
        }

        // Gọi api lấy dish recommend
        const res = await getAllDishesRecommendApi(dishIds);

        setRecommendDishes(res.data ?? []);
      } catch (error) {
        console.error(error);
        setRecommendDishes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [orderItems]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 border border-gray-100"
          >
            <Skeleton.Image active className="!w-full !h-[130px] !rounded-lg" />

            <div className="mt-3">
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!recommendDishes.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        Không có món ăn gợi ý
      </div>
    );
  }

  const onOpenModal = (dishId: string) => {
    if (!dishId) return;
    setDishId(dishId);
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onAddOrderItem = (item: OrderItemRequest) => {
    addOrderItemMutation.mutate(item, {
      onSuccess: () => {
        addToOrder();
        onCloseModal();
      },
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendDishes.map((dish) => (
          <div
            key={dish.dishId}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {dish.name}
              </h3>

              {/* Price */}
              <div className="flex items-center justify-between">
                <span className="text-red-500 font-bold text-lg">
                  {formatCurrency(dish.basePrice)}
                </span>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium cursor-pointer"
                  onClick={() => onOpenModal(dish.dishId)}
                >
                  Thêm vào
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DishDetailDrawer
        open={openModal}
        dishId={dishId as string}
        onClose={onCloseModal}
        onAddToOrder={onAddOrderItem}
      />
    </>
  );
};
