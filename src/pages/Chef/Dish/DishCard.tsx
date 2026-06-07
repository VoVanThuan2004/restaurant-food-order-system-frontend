import { useUpdateDishStatus } from "../../../hooks/dish/useUpdateDishStatus";
import type { DishResponse } from "../../../types/dish.type";
import { formatPrice } from "../../../utils/formatPrice";

export const DishCard = (dish: DishResponse) => {

  // Hàm gọi cập nhật trạng thái món ăn
  const updateDishStatusMutation = useUpdateDishStatus();

  const onUpdateDishStatus = (dishId: string) => {
    updateDishStatusMutation.mutate(dishId);
  }

  return (
    <div className="flex flex-col bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
      {/* Ảnh */}
      <img
        src={dish.image}
        alt={"menu-image"}
        className="h-56 w-full object-cover"
      />

      {/* Nội dung */}
      <div className="flex flex-col gap-2 px-4 py-3">
        {/* tên */}
        <p className="text-lg font-semibold text-gray-800">{dish.name}</p>

        {/* giá */}
        <p className="text-red-600 font-semibold text-md">
          {formatPrice(dish.basePrice)}
        </p>

        {/* trạng thái */}
        <div className="flex justify-between items-center mt-2">
          {dish.status ? (
            <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 rounded-full">
              Đang bán
            </span>
          ) : (
            <span className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-600 rounded-full">
              Tạm tắt
            </span>
          )}

          {/* nút bật tắt */}
          <button
            disabled={updateDishStatusMutation.isPending}
            onClick={() => onUpdateDishStatus(dish.dishId)}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition flex items-center justify-center gap-2 cursor-pointer
      
      ${
        dish.status
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-green-500 text-white hover:bg-green-600"
      }`}
          >
            {/* {updateMenuStatusMutate.isPending && (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )} */}

            {dish.status ? "Tắt món" : "Bật món"}
          </button>
        </div>
      </div>
    </div>
  );
};
