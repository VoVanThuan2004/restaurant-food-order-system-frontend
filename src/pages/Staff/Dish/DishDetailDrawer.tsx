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
      width={520}
      closable={false}
      destroyOnClose
      bodyStyle={{ padding: 0 }}
      className="dish-detail-drawer"
    >
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Spin size="large" />
        </div>
      ) : dish ? (
        <div className="flex flex-col h-full">
          {/* Header Section - Image + Info */}
          <div className="border-b border-gray-100 p-6 flex gap-4">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all z-10"
            >
              <svg
                className="w-6 h-6"
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

            {/* Image */}
            <div className="flex-shrink-0">
              <Image
                src={dish.image}
                alt={dish.name}
                className="w-28 h-28 object-cover rounded-lg"
                preview={false}
                fallback="/placeholder-dish.jpg"
              />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <Title level={3} className="mb-1">
                  {dish.name}
                </Title>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-red-500">
                    {calculateTotalPrice().toLocaleString("vi-VN")} ₫
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Variants/Options Section */}
              {dish.variants && dish.variants.length > 0 && (
                <div className="space-y-6">
                  <Title level={4} className="text-gray-900 mb-4">
                    Tùy chọn thêm
                  </Title>

                  {dish.variants.map((group) => (
                    <div key={group.groupId} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Title level={5} className="mb-0 text-gray-800">
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
                              className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
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
                              <div className="flex-1 min-w-0">
                                <Text className="font-medium text-gray-900 block">
                                  {option.optionName}
                                </Text>
                              </div>

                              {/* Price Adjustment */}
                              <Text
                                className={`font-semibold flex-shrink-0 ${
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
              <div className="space-y-4 border-t border-gray-100 pt-6">
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
                      className="group relative w-12 h-12 rounded-xl bg-gray-50 hover:bg-white hover:shadow-sm border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      <Minus
                        size={18}
                        className="text-gray-500 group-hover:text-gray-700 transition-colors"
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
                      className="flex-1 h-12 px-3 text-center text-lg font-medium bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />

                    <button
                      onClick={() => {
                        if (quantity >= 50) return;
                        setQuantity(quantity + 1);
                      }}
                      className="group relative w-12 h-12 rounded-xl bg-gray-50 hover:bg-white hover:shadow-sm border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-all duration-200 active:scale-95"
                      aria-label="Increase quantity"
                    >
                      <Plus
                        size={18}
                        className="text-gray-500 group-hover:text-gray-700 transition-colors"
                      />
                    </button>
                  </div>
                </div>

                {/* Notes/Special Instructions */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <NotebookPen size={16} className="text-gray-600" />
                    <label className="text-sm font-semibold text-gray-700">
                      Ghi chú (không bắt buộc)
                    </label>
                  </div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ví dụ: Không muốn đường, thêm ớt, v.v..."
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none font-medium text-gray-700 placeholder-gray-400"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tối đa 200 ký tự ({notes.length}/200)
                  </p>
                </div>
              </div>
              <div className="pt-4">
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
                  className="h-14 text-base font-semibold rounded-lg"
                  icon={<ShoppingCart size={18} />}
                >
                  Thêm vào giỏ hàng -{" "}
                  {(calculateTotalPrice() * quantity).toLocaleString("vi-VN")} ₫
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Drawer>
  );
};
