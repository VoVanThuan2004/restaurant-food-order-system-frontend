import { NotebookPen } from "lucide-react";
import type { OrderItem, OrderItemVariant } from "../../../types/order.type";
import type { OrderItemStatus } from "../../../types/order-item.type";
import ItemStatusSelect from "./ItemStatusSelect";
import { useConfirmStatus } from "../../../hooks/order-item/useConfirmStatus";

type Props = {
  item: OrderItem;
};

export const OrderItemInfo = (props: Props) => {
  const { item } = props;

  // Gọi hook api xác nhận trạng thái món ăn
  const confirmItemStatusMutation = useConfirmStatus();

  const onConfirmItemStatus = (
    status: OrderItemStatus,
  ) => {
    if (!status) return;

    confirmItemStatusMutation.mutate({
      orderItemId: item.orderItemId,
      status,
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex gap-4">
        {/* Image */}
        <img
          src={item.dishImage}
          alt={item.dishName}
          className="w-24 h-24 rounded-xl object-cover border border-gray-100"
        />

        {/* Content */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm md:text-base font-semibold text-gray-800 leading-snug">
                {item.dishName || "Alo"}
              </h2>

              <p className="text-xs text-gray-500 mt-1">SL: {item.quantity}</p>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-red-600">
                {item.totalPrice.toLocaleString("vi-VN")}đ
              </span>

              {item.quantity > 1 && (
                <span className="text-xs text-gray-400">
                  {item.basePrice.toLocaleString("vi-VN")}đ / món
                </span>
              )}
            </div>
          </div>

          {/* Variants */}
          {item.orderItemVariants?.length > 0 && (
            <div className="flex flex-col gap-2">
              {Object.entries(
                item.orderItemVariants.reduce(
                  (acc, variant) => {
                    if (!acc[variant.groupName]) {
                      acc[variant.groupName] = [];
                    }

                    acc[variant.groupName].push(variant);

                    return acc;
                  },
                  {} as Record<string, OrderItemVariant[]>,
                ),
              ).map(([groupName, variants]) => (
                <div
                  key={groupName}
                  className="flex flex-wrap gap-2 items-center"
                >
                  <span className="text-xs font-medium text-gray-500">
                    {groupName}:
                  </span>

                  {variants.map((variant) => (
                    <div
                      key={variant.optionId}
                      className="px-2 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs text-gray-700"
                    >
                      {variant.optionName}
                      {variant.priceAdjustment > 0 && (
                        <span className="text-red-500 ml-1">
                          (+{variant.priceAdjustment.toLocaleString("vi-VN")}đ)
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Notes */}
          {item.notes && (
            <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2">
              <NotebookPen
                className="text-yellow-600 shrink-0 mt-[1px]"
                size={16}
              />

              <p className="text-xs text-yellow-700 leading-relaxed">
                {item.notes}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end">
            <ItemStatusSelect
              status={item.currentStatus as OrderItemStatus}
              onChange={onConfirmItemStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
