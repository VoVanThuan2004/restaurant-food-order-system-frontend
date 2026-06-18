import { Button, Tag, Spin, notification } from "antd";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "../../../utils/formatPrice";
import { useOrderDetail } from "../../../hooks/order/useOrderDetail";
import { useDeleteOrderItem } from "../../../hooks/order/useDeleteOrderItem";
import { useUpdateItemQuantity } from "../../../hooks/order-item/useUpdateItemQuantity";
import { useUpdateItemNotes } from "../../../hooks/order-item/useUpdateItemNotes";
import { usePlaceOrder } from "../../../hooks/order/usePlaceOrder";
import { useConfirmStatusSocket } from "../../../hooks/order-item/userConfirmStatusSocket";
import { payOrderApi } from "../../../services/payment.api";
import { getApiError } from "../../../utils/get-api-error";
import { useState, useEffect } from "react";
import { PaymentCashModal } from "./PaymentCashModal";
import { PaymentBankTransferModal } from "./PaymentBankTransferModal";
import { useTotalItemsStore } from "../../../stores/useTotalItemsStore";
import { CartItem } from "./CartItem";
import { DishRecommendList } from "./DishRecommentList";

export const CartPage = () => {
  const { orderId = "" } = useParams();
  const navigate = useNavigate();
  const [cashModalOpen, setCashModalOpen] = useState(false);
  const [bankTransferModalOpen, setBankTransferModalOpen] = useState(false);

  const decreaseItem = useTotalItemsStore((state) => state.decreaseItem);

  const { data, isLoading, isError } = useOrderDetail(orderId);
  const orderDetail = data?.data;

  const deleteOrderItemMutation = useDeleteOrderItem();
  const updateItemQuantity = useUpdateItemQuantity();
  const updateItemNotes = useUpdateItemNotes();
  const placeOrderMutation = usePlaceOrder();

  useConfirmStatusSocket(orderId);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Lỗi",
        description: "Không thể tải chi tiết đơn hàng",
      });
      navigate("/dining-tables");
    }
  }, [isError, navigate]);

  const onDeleteOrderItem = (orderItemId: string) => {
    if (!orderItemId) return;
    deleteOrderItemMutation.mutate(orderItemId, {
      onSuccess: () => {
        decreaseItem();
        notification.success({
          message: "Xóa thành công",
          duration: 2,
        });
      },
    });
  };

  const onUpdateItemQuantity = (orderItemId: string, newQuantity: number) => {
    if (!orderItemId) return;
    if (newQuantity <= 0 || newQuantity > 50) return;
    updateItemQuantity.mutate({ orderItemId, newQuantity });
  };

  const onUpdateItemNotes = (orderItemId: string, notes: string) => {
    if (!orderId) return;
    if (!orderItemId) return;
    updateItemNotes.mutate({ orderItemId, notes });
  };

  const onPlaceOrder = () => {
    if (!orderId) return;
    placeOrderMutation.mutate(orderId, {
      onSuccess: () => {
        notification.success({
          message: "Đặt món thành công",
          description: "Đơn hàng của bạn đã được gửi đến bếp",
          duration: 2,
        });
      },
    });
  };

  const onPayOrder = async (paymentMethod: string, amountReceived: number) => {
    if (!orderId) return;
    try {
      const res = await payOrderApi(orderId, paymentMethod, amountReceived);

      if (res.status === "success" && paymentMethod === "CASH") {
        notification.success({
          message: "Thanh toán thành công",
          duration: 1,
        });
        setTimeout(() => navigate("/payment-history"), 500);
      }

      if (res.status === "success" && paymentMethod === "TRANSFER") {
        setBankTransferModalOpen(true);
      }
    } catch (error) {
      const apiError = getApiError(error);
      notification.error({
        message: "Lỗi",
        description:
          apiError.message || "Bị lỗi khi thanh toán, vui lòng thử lại sau",
      });
      setBankTransferModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Spin size="large" />
      </div>
    );
  }

  const canPlaceOrder =
    orderDetail?.orderItems?.some((item) => item.currentStatus === "NEW") ??
    false;

  const isEmpty =
    !orderDetail?.orderItems || orderDetail.orderItems.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={() => navigate(`/orders/${orderId}/dish`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Giỏ hàng</h1>
              <p className="text-sm text-gray-600">
                Kiểm tra lại các món ăn trước khi đặt hàng
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Bàn:</span>
            <span className="font-medium text-gray-900">
              {orderDetail?.diningTableName}
            </span>
            <span className="text-sm text-gray-600 ml-4">Nhân viên:</span>
            <span className="font-medium text-gray-900">
              {orderDetail?.staffName}
            </span>
            <Tag color="red" className="ml-auto">
              {orderDetail?.orderItems?.length || 0} món
            </Tag>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isEmpty ? (
          // Empty State
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-gray-100 rounded-full">
                  <ShoppingBag size={80} className="text-gray-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Giỏ hàng đang trống
              </h3>
              <p className="text-gray-600 mb-8 text-lg">Hãy chọn thêm món ăn</p>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate("/dining-tables")}
                className="bg-red-500 hover:bg-red-600 border-0 h-12 px-8 text-base font-semibold rounded-xl"
              >
                Quay lại thực đơn
              </Button>
            </div>
          </div>
        ) : (
          // Cart Content - 2 Column Layout
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Section - Cart Items (70% on desktop) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Cart Items */}
                <div className="space-y-4">
                  {orderDetail?.orderItems?.map((item) => (
                    <CartItem
                      key={item.orderItemId}
                      orderItem={item}
                      onDelete={onDeleteOrderItem}
                      isDeleting={deleteOrderItemMutation.isPending}
                      onUpdateQuantity={onUpdateItemQuantity}
                      onUpdateNotes={onUpdateItemNotes}
                    />
                  ))}
                </div>

                {/* Continue Shopping Button */}
                <Button
                  block
                  size="large"
                  className="rounded-xl border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold h-12"
                  onClick={() => navigate(`/orders/${orderId}/dish`)}
                >
                  ← Tiếp tục chọn món
                </Button>
              </div>

              {/* Right Section - Summary & Checkout (30% on desktop) */}
              <div>
                {/* Summary Card */}
                <div className="sticky top-35 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Thanh toán
                  </h3>

                  {/* Summary Details */}
                  <div className="space-y-3 border-t border-b border-gray-200 py-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Tạm tính</span>
                      <span className="font-semibold text-gray-900">
                        {formatPrice(orderDetail?.totalPrice || 0)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Thành tiền</span>
                      <span className="font-semibold text-gray-900">
                        {formatPrice(orderDetail?.totalPrice || 0)}
                      </span>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      Tổng cộng
                    </span>
                    <span className="text-3xl font-bold text-red-500">
                      {formatPrice(orderDetail?.totalPrice || 0)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <Button
                      type="primary"
                      block
                      size="large"
                      onClick={onPlaceOrder}
                      disabled={!canPlaceOrder || placeOrderMutation.isPending}
                      className="rounded-xl bg-red-500 hover:bg-red-600 border-0 font-semibold h-11"
                    >
                      {placeOrderMutation.isPending
                        ? "Đang xử lý..."
                        : "Tiến hành đặt món"}
                    </Button>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        size="large"
                        onClick={() => setCashModalOpen(true)}
                        className="rounded-xl font-semibold h-11 border-gray-300 hover:border-gray-400"
                      >
                        Tiền mặt
                      </Button>

                      <Button
                        type="primary"
                        size="large"
                        onClick={() => onPayOrder("TRANSFER", 0)}
                        className="rounded-xl font-semibold h-11 bg-red-500 hover:bg-red-600 border-0"
                      >
                        Chuyển khoản
                      </Button>
                    </div>
                  </div>

                  {/* Help Text */}
                  <p className="text-xs text-gray-500 text-center pt-2">
                    Hãy đặt món trước khi thanh toán
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendations Section - Full Width Below */}
            <div className="mt-12">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Có thể bạn sẽ thích
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Các món thường được gọi cùng với đơn hàng của bạn
              </p>

              {/* Recommendation Cards - Grid Layout */}
              <DishRecommendList orderItems={orderDetail.orderItems}/>
            </div>
          </>
        )}
      </div>

      {/* Payment Modals */}
      <PaymentCashModal
        cashModalOpen={cashModalOpen}
        setCashModalOpen={setCashModalOpen}
        totalPrice={orderDetail?.totalPrice as number}
        onPayOrder={onPayOrder}
      />

      <PaymentBankTransferModal
        bankTransferModalOpen={bankTransferModalOpen}
        setBankTransferModalOpen={setBankTransferModalOpen}
        totalPrice={orderDetail?.totalPrice || 0}
        orderId={orderId}
      />
    </div>
  );
};
