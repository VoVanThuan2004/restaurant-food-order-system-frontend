import type { DishResponse } from "../../../types/dish.type";
import { formatPrice } from "../../../utils/formatPrice";

type Props = {
    dish: DishResponse;
    onOpenDrawer: (dishId: string) => void;
}
export const DishCard = ({ dish, onOpenDrawer }: Props) => {

//   const orderId = useParams();

  return (
    <div className="relative flex flex-col w-full bg-white shadow-xl rounded-xl hover:shadow-2xl transition">
      {/* Overlay khi menu tắt */}
      {!dish.status && (
        <div className="absolute inset-0 bg-gray-200/70 z-10 flex items-center justify-center rounded-xl">
          <p className="text-gray-700 font-semibold text-lg">
            Tạm ngưng phục vụ
          </p>
        </div>
      )}

      {/* ảnh */}
      <img
        src={dish.image}
        alt="image"
        className="rounded-t-xl h-70 object-cover"
      />

      {/* Tên + giá */}
      <div className="flex flex-col justify-center items-center gap-1.5 mt-2">
        <p className="text-[20px] font-semibold">{dish.name}</p>
        <p className="text-[18px] text-red-600 font-medium">{formatPrice(dish.basePrice)}</p>
      </div>

      {/* Tăng giảm số lượng */}
      <div className="flex flex-col md:px-5 px-10 gap-3.5 my-3">
       

        <button
          disabled={!dish.status}
          className="bg-red-500 text-white rounded-2xl py-3 shadow-md cursor-pointer
        disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={() =>
            onOpenDrawer(dish.dishId)
          }
        >
          Thêm giỏ hàng
        </button>
      </div>
    </div>
  );
}