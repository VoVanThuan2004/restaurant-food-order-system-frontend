import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { MenuDTO } from "../types/menu.type";

type Props = {
  _id: string;
  name: string;
  price: number;
  image: string;
  status: boolean;
  handleAddMenu: (menu: MenuDTO) => void;
};

const MenuCard = (props: Props) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantity = () => {
    if (quantity === 1) return;

    setQuantity((q) => q - 1);
  };

  const orderId = localStorage.getItem("orderId") || null;

  return (
    <div className="relative flex flex-col w-full bg-white shadow-xl rounded-xl hover:shadow-2xl transition">
      {/* Overlay khi menu tắt */}
      {!props.status && (
        <div className="absolute inset-0 bg-gray-200/70 z-10 flex items-center justify-center rounded-xl">
          <p className="text-gray-700 font-semibold text-lg">
            Tạm ngưng phục vụ
          </p>
        </div>
      )}

      {/* ảnh */}
      <img
        src={props.image}
        alt="image"
        className="rounded-t-xl h-70 object-cover"
      />

      {/* Tên + giá */}
      <div className="flex flex-col justify-center items-center gap-1.5 mt-2">
        <p className="text-[20px] font-semibold">{props.name}</p>
        <p className="text-[18px] text-red-600 font-medium">{props.price} ₫</p>
      </div>

      {/* Tăng giảm số lượng */}
      <div className="flex flex-col md:px-5 px-10 gap-3.5 my-3">
        <div className="flex justify-between items-center bg-gray-100 px-0.5 rounded-2xl border border-gray-300">
          <button
            disabled={!props.status}
            className="bg-white p-1 rounded-2xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={handleDecreaseQuantity}
          >
            <Minus color="red" />
          </button>

          <p className="font-semibold">{quantity}</p>

          <button
            disabled={!props.status}
            className="bg-white p-1 rounded-2xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => setQuantity((q) => q + 1)}
          >
            <Plus color="red" />
          </button>
        </div>

        <button
          disabled={!props.status}
          className="bg-red-500 text-white rounded-2xl py-3 shadow-md cursor-pointer
        disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={() =>
            props.handleAddMenu({
              orderId,
              menuId: props._id,
              quantity: quantity,
            })
          }
        >
          Thêm giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
