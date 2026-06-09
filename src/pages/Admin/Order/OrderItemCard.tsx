import type { OrderItem } from "../../../types/order.type";

type Props = {
  item: OrderItem;
};

export const OrderItemCard = ({ item }: Props) => {
  return (
    <div className="flex gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      {/* Image */}
      <img
        src={item.dishImage}
        alt={item.dishName}
        className="h-20 w-20 rounded-lg object-cover"
      />

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              {item.dishName}
            </h3>

            <span className="mt-1 inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
              {item.currentStatus}
            </span>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-red-500">
              {item.totalPrice.toLocaleString("vi-VN")} ₫
            </p>

            <p className="text-sm text-gray-500">
              SL: {item.quantity}
            </p>
          </div>
        </div>

        {/* Variants */}
        {item.orderItemVariants.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.orderItemVariants.map((variant) => (
              <span
                key={variant.optionId}
                className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700"
              >
                {variant.groupName}: {variant.optionName}
              </span>
            ))}
          </div>
        )}

        {/* Notes */}
        {item.notes && (
          <div className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">
            <span className="font-medium">Ghi chú:</span>{" "}
            {item.notes}
          </div>
        )}
      </div>
    </div>
  );
};