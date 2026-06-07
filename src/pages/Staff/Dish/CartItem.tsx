import { Button, Card, Tag } from "antd";
import type { OrderItem } from "../../../types/order.type";
import { ORDER_ITEM_STATUS_UI } from "../../../utils/order-item-status-ui";
import { formatPrice } from "../../../utils/formatPrice";
import { Minus, Pencil, Plus, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";

export const CartItem = ({
  orderItem,
  onDelete,
  isDeleting,
  onUpdateQuantity,
  onUpdateNotes,
}: {
  orderItem: OrderItem;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  onUpdateQuantity: (orderItemId: string, newQuantity: number) => void;
  onUpdateNotes: (orderItemId: string, notes: string) => void;
}) => {
  const statusConfig = ORDER_ITEM_STATUS_UI[orderItem.currentStatus];
  const isEditable = orderItem.currentStatus === "NEW";

  // Local quantity state
  const [quantity, setQuantity] = useState(orderItem.quantity);
  const [notes, setNotes] = useState(orderItem.notes || "");

  // Tính tổng price adjustment
  const totalAdjustment =
    orderItem.orderItemVariants?.reduce(
      (sum, v) => sum + (v.priceAdjustment || 0),
      0,
    ) || 0;

  const debouncedUpdateRef = useRef(
    debounce((newQuantity: number) => {
      onUpdateQuantity(orderItem.orderItemId, newQuantity);
    }, 600),
  );

  const debouncedUpdateNotesRef = useRef(
    debounce((newNotes: string) => {
      onUpdateNotes(orderItem.orderItemId, newNotes);
    }, 1000),
  );

  // Cleanup
  useEffect(() => {
    return () => {
      debouncedUpdateRef.current.cancel();
      debouncedUpdateNotesRef.current.cancel();
    };
  }, []);

  // Increase
  const handleIncrease = () => {
    const newQuantity = quantity + 1;

    setQuantity(newQuantity);

    debouncedUpdateRef.current(newQuantity);
  };

  // Decrease
  const handleDecrease = () => {
    if (quantity <= 1) return;

    const newQuantity = quantity - 1;

    setQuantity(newQuantity);

    debouncedUpdateRef.current(newQuantity);
  };

  const handleChangeNotes = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setNotes(e.target.value);
    debouncedUpdateNotesRef.current(e.target.value);
  }

  return (
    <Card
      className="rounded-2xl border-0 shadow-sm"
      styles={{ body: { padding: 16 } }}
    >
      {/* TOP */}
      <div className="flex justify-between gap-3">
        {/* LEFT */}
        <div className="flex gap-3">
          <img
            src={orderItem.dishImage}
            alt="dish"
            className="w-16 h-16 rounded-xl object-cover"
          />

          <div className="flex-1">
            <h3 className="font-semibold text-[15px]">{orderItem.dishName}</h3>

            {/* === GIÁ CHI TIẾT === */}
            <div className="mt-1 space-y-0.5">
              <div className="flex items-baseline gap-2">
                <span className="text-gray-500 text-sm">Giá gốc:</span>
                <span className="font-medium">
                  {formatPrice(orderItem.basePrice)}
                </span>
              </div>

              {totalAdjustment !== 0 && (
                <div className="flex items-baseline gap-2">
                  <span className="text-gray-500 text-sm">Biến thể:</span>
                  <span
                    className={`font-medium ${totalAdjustment > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {totalAdjustment > 0 ? "+" : ""}
                    {formatPrice(totalAdjustment)}
                  </span>
                </div>
              )}

              <p className="text-red-500 font-bold text-base mt-1">
                {formatPrice(orderItem.totalPrice)}
              </p>
            </div>
          </div>
        </div>

        {/* STATUS */}
        <div
          className={`px-3 py-1 rounded-full border text-xs font-semibold h-fit ${statusConfig.className}`}
        >
          {statusConfig.label}
        </div>
      </div>

      {/* VARIANTS */}
      {orderItem.orderItemVariants?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {orderItem.orderItemVariants.map((variant) => (
            <Tag
              key={variant.optionId}
              bordered={false}
              className="px-3 py-1 rounded-full"
            >
              {variant.groupName}: {variant.optionName}
              {variant.priceAdjustment !== 0 && (
                <span className="ml-1 text-xs">
                  ({variant.priceAdjustment > 0 ? "+" : ""}
                  {formatPrice(variant.priceAdjustment)})
                </span>
              )}
            </Tag>
          ))}
        </div>
      )}

      {/* NOTES */}
      <div className="mt-3">
        <p className="text-xs text-gray-500 mb-1">Ghi chú</p>

        <input
          type="text"
          value={notes}
          onChange={(e) => handleChangeNotes(e)}
          disabled={!isEditable}
          placeholder="Nhập ghi chú (nếu có)"
          className="
      w-full
      bg-white
      border border-gray-200
      rounded-xl
      px-3 py-2
      text-sm
      focus:outline-none
      focus:border-red-400
      disabled:bg-gray-100
      disabled:cursor-not-allowed
    "
        />
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-5">
        {/* QUANTITY */}
        <div
          className={`flex items-center gap-4 border border-gray-200 rounded-xl px-3 py-2 ${
            !isEditable ? "opacity-50" : ""
          }`}
        >
          <Button
            type="text"
            size="small"
            disabled={!isEditable}
            icon={<Minus size={16} />}
            onClick={handleDecrease}
          />
          <span className="font-semibold min-w-[20px] text-center">
            {quantity}
          </span>
          <Button
            type="text"
            size="small"
            disabled={!isEditable}
            icon={<Plus size={16} />}
            onClick={handleIncrease}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          {isEditable && (
            <>
              <Button type="text" icon={<Pencil size={16} />} />
              <Button
                danger
                type="text"
                icon={<Trash2 size={16} />}
                onClick={() => onDelete(orderItem.orderItemId)}
                disabled={isDeleting}
              />
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
