import { CirclePlus, Minus, Plus, Trash2 } from "lucide-react";
import type { OrderItem } from "../types/order-item";
import formatCurrency from "../../../../utils/formatCurrency";
import { useUpdateQuantityItem } from "../hooks/useUpdateQuantityItem";
import { useDeleteItem } from "../hooks/useDeleteItem";
import { useUpdateNoteItem } from "../hooks/useUpdateNoteItem";
import { useState } from "react";

const CartItem = ({ orderItem }: { orderItem: OrderItem }) => {
  const [notes, setNotes] = useState(orderItem.notes);

  // Gọi hook api cập nhật số lượng
  const updateQuantityMutation = useUpdateQuantityItem();

  // Gọi hook api xóa item
  const deleteItemMutation = useDeleteItem();

  // Gọi hook api cập nhật ghi chú
  const updateNotesMutation = useUpdateNoteItem();

  const isEditable = orderItem.currentStatus === "PENDING";


  const handleIncrease = () => {
    updateQuantityMutation.mutate({
      orderItemId: orderItem._id,
      newQuantity: orderItem.quantity + 1,
    });
  };

  const handleDecrease = () => {
    if (orderItem.quantity === 1) return;
    updateQuantityMutation.mutate({
      orderItemId: orderItem._id,
      newQuantity: orderItem.quantity - 1,
    });
  };

  const handleDelete = () => {
    deleteItemMutation.mutate(orderItem._id);
  };

  const handleUpdateNote = () => {
    if (!orderItem._id) return;

    updateNotesMutation.mutate({ orderItemId: orderItem._id, notes });
  };

  return (
    <div className="flex flex-col bg-gray-50 px-4 py-4 rounded-xl shadow-sm mt-3">
      {/* Icon xóa */}
      {orderItem.currentStatus === "PENDING" && (
        <div className="flex justify-end mb-2">
          <Trash2
            size={14}
            color="red"
            className="cursor-pointer"
            onClick={() => handleDelete()}
          />
        </div>
      )}

      {/* Ảnh + Tên món + trạng thái */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={orderItem.menuImage}
            alt="image"
            className="w-12 h-12 rounded-md"
          />
          <p className="text-[18px] font-medium">{orderItem.menuName}</p>
        </div>

        {orderItem.currentStatus === "PENDING" && (
          <div className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-xl">
            <p className="text-[11px] text-gray-500 font-bold">Pending</p>
          </div>
        )}

        {orderItem.currentStatus === "CONFIRMED" && (
          <div className="bg-blue-100 border border-blue-300 px-3 py-1 rounded-xl">
            <p className="text-[11px] text-blue-500 font-bold">Comfirmed</p>
          </div>
        )}

        {orderItem.currentStatus === "PREPARING" && (
          <div className="bg-orange-100 border border-orange-300 px-3 py-1 rounded-xl">
            <p className="text-[11px] text-orange-500 font-bold">Preparing</p>
          </div>
        )}

        {orderItem.currentStatus === "READY" && (
          <div className="bg-green-100 border border-green-300 px-3 py-1 rounded-xl">
            <p className="text-[11px] text-green-500 font-bold">Ready</p>
          </div>
        )}

        {orderItem.currentStatus === "SERVED" && (
          <div className="bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-xl">
            <p className="text-[11px] text-emerald-500 font-bold">Served</p>
          </div>
        )}
      </div>

      {/* Giá */}
      <p className="text-red-500 font-bold mt-1">
        {formatCurrency(orderItem.price)}
      </p>

      {/* Số lượng + ghi chú */}
      <div className="flex items-center justify-between mt-3">
        {/* Quantity */}
        <div
          className={`flex items-center justify-between bg-white border border-gray-200 rounded-md px-1.5 py-1.5 gap-7
    ${!isEditable ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <button
            disabled={!isEditable}
            onClick={() => handleDecrease()}
            className={!isEditable ? "cursor-not-allowed" : "cursor-pointer"}
          >
            <Minus color="red" size={18} />
          </button>

          <p className="text-sm font-semibold">{orderItem.quantity}</p>

          <button
            disabled={!isEditable}
            onClick={() => handleIncrease()}
            className={!isEditable ? "cursor-not-allowed" : "cursor-pointer"}
          >
            <Plus color="red" size={18} />
          </button>
        </div>

        {/* Notes */}
        <div
          className={`flex items-center gap-1.5 ${!isEditable ? "opacity-60" : ""}`}
        >
          <input
            type="text"
            placeholder="Ghi chú"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={!isEditable}
            className="bg-white text-[13px] border border-gray-200 rounded-md py-1.5 px-2.5
      focus:outline-none focus:border-red-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />

          <button
            disabled={updateNotesMutation.isPending || !isEditable}
            onClick={() => handleUpdateNote()}
            className={`${
              !isEditable ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          >
            <CirclePlus size={20} className="text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
