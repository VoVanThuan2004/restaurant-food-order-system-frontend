import React, { useState, useEffect } from "react";
import {
  Drawer,
  Image,
  Typography,
  Button,
  Spin,
  message,
  Checkbox,
  Radio,
} from "antd";
import { ShoppingCart, Plus, Minus, NotebookPen } from "lucide-react";
import type { DishDetailResponse } from "../../../types/dish.type";
import { getDishDetailApi } from "../../../services/dish.api";
import { getApiError } from "../../../utils/get-api-error";
import type { OrderItemRequest } from "../../../types/order.type";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

interface DishDetailDrawerProps {
  open: boolean;
  dishId: string | null;
  onClose: () => void;
  onAddToOrder: (item: OrderItemRequest) => void; // Callback khi thêm vào giỏ
}

export const DishDetailDrawer: React.FC<DishDetailDrawerProps> = ({
  open,
  dishId,
  onClose,
  onAddToOrder,
}) => {
  const { orderId } = useParams();
  const [dish, setDish] = useState<DishDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  // Custom hook logic - Fetch khi dishId thay đổi
  useEffect(() => {
    if (!dishId || !open) {
      setDish(null);
      setSelectedOptions({});
      setQuantity(1);
      setNotes("");
      return;
    }

    const fetchDishDetail = async () => {
      setLoading(true);
      try {
        const res = await getDishDetailApi(dishId);
        const data = res.data;

        setDish(data as DishDetailResponse);

        // Khởi tạo selectedOptions cho các group required
        const initialSelections: Record<string, string[]> = {};
        data?.variants?.forEach((group) => {
          if (group?.required && group.options.length > 0) {
            initialSelections[group.groupId] = [group.options[0].optionId];
          } else {
            initialSelections[group.groupId] = [];
          }
        });
        setSelectedOptions(initialSelections);
      } catch (error) {
        const apiError = getApiError(error);
        message.error(apiError.message || "Không thể tải thông tin món ăn");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchDishDetail();
  }, [dishId, open]);

  const toggleOption = (
    groupId: string,
    optionId: string,
    isMultiple: boolean,
  ) => {
    setSelectedOptions((prev) => {
      const current = prev[groupId] || [];

      if (isMultiple) {
        return {
          ...prev,
          [groupId]: current.includes(optionId)
            ? current.filter((id) => id !== optionId)
            : [...current, optionId],
        };
      } else {
        return {
          ...prev,
          [groupId]: current.includes(optionId) ? [] : [optionId],
        };
      }
    });
  };

  const calculateTotalPrice = () => {
    if (!dish) return 0;
    let total = dish.basePrice || 0;

    Object.keys(selectedOptions).forEach((groupId) => {
      const group = dish.variants?.find((g) => g.groupId === groupId);
      if (group) {
        selectedOptions[groupId].forEach((optionId) => {
          const option = group.options.find((o) => o.optionId === optionId);
          if (option) total += option.priceAdjustment || 0;
        });
      }
    });

    return total;
  };

  const handleAddToOrder = (item: OrderItemRequest) => {
    if (!orderId) return;
    if (!item) return;

    onAddToOrder(item);
  };

  const isValidSelection = () => {
    if (!dish) return false;
    return dish.variants?.every((group) => {
      if (!group.required) return true;
      return (selectedOptions[group.groupId] || []).length > 0;
    });
  };

  return (
    <Drawer
      title={null}
      open={open}
      onClose={onClose}
      placement="right"
      width={520}
      closable={false}
      destroyOnHidden
      className="dish-detail-drawer"
      styles={{
        wrapper: { width: "100%", maxWidth: 520 },
        body: {
          padding: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        },
      }}
    >
      {loading ? (
        <div className="flex min-h-[50vh] flex-1 items-center justify-center">
          <Spin size="large" />
        </div>
      ) : dish ? (
        <div className="flex h-full min-h-0 flex-col">
          {/* Header Section - Image + Info */}
          <div className="relative shrink-0 border-b border-gray-100 p-4 sm:p-6">
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Đóng"
              className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition-all hover:bg-gray-200 sm:top-4 sm:right-4 sm:h-10 sm:w-10"
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex items-start gap-3 pr-10 sm:gap-5 sm:pr-0">
              {/* Image */}
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  classNames={{
                    root: "!h-full !w-full",
                    image: "!h-full !w-full object-cover",
                  }}
                  preview={false}
                  fallback="/placeholder-dish.jpg"
                />
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <Title
                  level={3}
                  className="!mb-2 !text-lg leading-snug break-words text-gray-900 sm:!text-2xl"
                >
                  {dish.name}
                </Title>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      dish.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {dish.status ? "Đang bán" : "Tạm hết"}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-gray-500">Tạm tính</span>
                    <p className="text-lg font-bold text-red-500 sm:text-xl">
                      {calculateTotalPrice().toLocaleString("vi-VN")} ₫
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">
              {/* Variants/Options Section */}
              {dish.variants && dish.variants.length > 0 && (
                <div className="space-y-4 sm:space-y-6">
                  <Title level={4} className="!mb-4 text-gray-900">
                    Tùy chọn thêm
                  </Title>

                  {dish.variants.map((group) => (
                    <div key={group.groupId} className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Title
                          level={5}
                          className="!mb-0 !text-base text-gray-800 sm:!text-lg"
                        >
                          {group.groupName}
                        </Title>
                        {group.required && (
                          <span className="text-red-500 font-semibold text-xs bg-red-50 px-2 py-1 rounded">
                            Bắt buộc
                          </span>
                        )}
                        {group.multiple && (
                          <span className="text-blue-600 font-semibold text-xs bg-blue-50 px-2 py-1 rounded">
                            Chọn nhiều
                          </span>
                        )}
                      </div>

                      {/* Options Container */}
                      <div className="space-y-2">
                        {group.options.map((option) => {
                          const isSelected = selectedOptions[
                            group.groupId
                          ]?.includes(option.optionId);

                          return (
                            <div
                              key={option.optionId}
                              onClick={() =>
                                toggleOption(
                                  group.groupId,
                                  option.optionId,
                                  group.multiple,
                                )
                              }
                              className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 p-3 transition-all duration-200 sm:gap-3 sm:p-4 ${
                                isSelected
                                  ? "border-blue-500 bg-blue-50/50"
                                  : "border-gray-200 bg-gray-50/30 hover:border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {/* Checkbox/Radio */}
                              <div className="flex-shrink-0">
                                {group.multiple ? (
                                  <Checkbox checked={isSelected} />
                                ) : (
                                  <Radio checked={isSelected} />
                                )}
                              </div>

                              {/* Option Details */}
                              <div className="min-w-0 flex-1">
                                <Text className="block font-medium break-words text-gray-900">
                                  {option.optionName}
                                </Text>
                              </div>

                              {/* Price Adjustment */}
                              <Text
                                className={`shrink-0 whitespace-nowrap text-sm font-semibold sm:text-base ${
                                  option.priceAdjustment > 0
                                    ? "text-green-600"
                                    : option.priceAdjustment < 0
                                      ? "text-red-600"
                                      : "text-gray-500"
                                }`}
                              >
                                {option.priceAdjustment > 0 && "+"}
                                {option.priceAdjustment.toLocaleString(
                                  "vi-VN",
                                )}{" "}
                                ₫
                              </Text>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity & Notes Section */}
              <div className="space-y-4 border-t border-gray-100 pt-5 sm:pt-6">
                {/* Quantity Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-900">
                      Số lượng
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 transition-all duration-200 hover:border-gray-300 hover:bg-white hover:shadow-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:w-12"
                      aria-label="Decrease quantity"
                    >
                      <Minus
                        size={18}
                        className="text-gray-500 transition-colors group-hover:text-gray-700"
                      />
                    </button>

                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 1 && val <= 50) {
                          setQuantity(val);
                        } else if (val > 50) {
                          setQuantity(50);
                        } else if (e.target.value === "") {
                          setQuantity(1);
                        }
                      }}
                      className="h-10 min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 text-center text-base font-medium transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none sm:h-12 sm:text-lg"
                    />

                    <button
                      onClick={() => {
                        if (quantity >= 50) return;
                        setQuantity(quantity + 1);
                      }}
                      className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 transition-all duration-200 hover:border-gray-300 hover:bg-white hover:shadow-sm active:scale-95 sm:h-12 sm:w-12"
                      aria-label="Increase quantity"
                    >
                      <Plus
                        size={18}
                        className="text-gray-500 transition-colors group-hover:text-gray-700"
                      />
                    </button>
                  </div>
                </div>

                {/* Notes/Special Instructions */}
                <div>
                  <div className="mb-2 flex items-center gap-2 sm:mb-3">
                    <NotebookPen size={16} className="text-gray-600" />
                    <label className="text-sm font-semibold text-gray-700">
                      Ghi chú (không bắt buộc)
                    </label>
                  </div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    maxLength={200}
                    placeholder="Ví dụ: Không muốn đường, thêm ớt, v.v..."
                    className="w-full resize-none rounded-lg border-2 border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none sm:text-base"
                    rows={3}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Tối đa 200 ký tự ({notes.length}/200)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Add to cart */}
          <div className="shrink-0 border-t border-gray-100 bg-white p-4 sm:p-6">
            <Button
              type="primary"
              size="large"
              block
              onClick={() =>
                handleAddToOrder({
                  orderId: orderId as string,
                  dishId: dish.dishId,
                  quantity,
                  notes,
                  variants: Object.values(selectedOptions)
                    .flat()
                    .map((optionId) => ({ optionId })),
                })
              }
              disabled={!isValidSelection()}
              className="!h-12 rounded-lg text-sm font-semibold sm:!h-14 sm:text-base"
              icon={<ShoppingCart size={18} />}
            >
              <span className="whitespace-nowrap sm:hidden">
                Thêm -{" "}
                {(calculateTotalPrice() * quantity).toLocaleString("vi-VN")} ₫
              </span>
              <span className="hidden whitespace-nowrap sm:inline">
                Thêm vào giỏ hàng -{" "}
                {(calculateTotalPrice() * quantity).toLocaleString("vi-VN")} ₫
              </span>
            </Button>
          </div>
        </div>
      ) : null}
    </Drawer>
  );
};
