import { Button, Drawer, notification, Tag } from "antd";
import Text from "antd/es/typography/Text";
import { CartItem } from "./CartItem";
import { formatPrice } from "../../../utils/formatPrice";
import { useOrderDetail } from "../../../hooks/order/useOrderDetail";
import { useNavigate } from "react-router-dom";
import { useDeleteOrderItem } from "../../../hooks/order/useDeleteOrderItem";
import { useUpdateItemQuantity } from "../../../hooks/order-item/useUpdateItemQuantity";
import { useUpdateItemNotes } from "../../../hooks/order-item/useUpdateItemNotes";
import { usePlaceOrder } from "../../../hooks/order/usePlaceOrder";
import { useConfirmStatusSocket } from "../../../hooks/order-item/userConfirmStatusSocket";
import { payOrderApi } from "../../../services/payment.api";
import { getApiError } from "../../../utils/get-api-error";
import { useState } from "react";
import { PaymentCashModal } from "./PaymentCashModal";
import { PaymentBankTransferModal } from "./PaymentBankTransferModal";
import { useTotalItemsStore } from "../../../stores/useTotalItemsStore";

type Props = {
  open: boolean;
  onClose: () => void;
  orderId: string;
};

export const CartDrawer = ({ open, onClose, orderId }: Props) => {
  const [cashModalOpen, setCashModalOpen] = useState(false);
  const [bankTransferModalOpen, setBankTransferModalOpen] = useState(false);
  const navigate = useNavigate();

  const decreaseItem = useTotalItemsStore((state) => state.decreaseItem);

  // Gọi hook lấy chi tiết đơn gọi món
  const { data, isLoading, isError } = useOrderDetail(orderId);
  const orderDetail = data?.data;

  // Gọi hook xóa món ăn
  const deleteOrderItemMutation = useDeleteOrderItem();

  // Gọi hook cập nhật số lượng món ăn
  const updateItemQuantity = useUpdateItemQuantity();

  // Gọi hook cập nhật ghi chú món ăn
  const updateItemNotes = useUpdateItemNotes();

  // Gọi hook đặt món ăn
  const placeOrderMutation = usePlaceOrder();

  useConfirmStatusSocket(orderId);

  const onDeleteOrderItem = (orderItemId: string) => {
    if (!orderItemId) return;
    deleteOrderItemMutation.mutate(orderItemId, {
      onSuccess: () => {
        decreaseItem();
      },
    });
  };

  const onUpdateItemQuantity = (orderItemId: string, newQuantity: number) => {
    if (!orderItemId) return;
    if (newQuantity <= 0 || newQuantity > 50) return;

    updateItemQuantity.mutate({
      orderItemId,
      newQuantity,
    });
  };

  const onUpdateItemNotes = (orderItemId: string, notes: string) => {
    if (!orderId) return;
    if (!orderItemId) return;

    updateItemNotes.mutate({
      orderItemId,
      notes,
    });
  };

  // Hàm gọi api đặt món ăn
  const onPlaceOrder = () => {
    if (!orderId) return;

    placeOrderMutation.mutate(orderId);
  };

  // Hàm gọi api thanh toán đơn gọi món
  const onPayOrder = async (paymentMethod: string, amountReceived: number) => {
    if (!orderId) return;
    try {
      const res = await payOrderApi(orderId, paymentMethod, amountReceived);

      // Thanh toán thành công
      if (res.status === "success" && paymentMethod === "CASH") {
        navigate("/payment-history");
      }

      if (res.status === "success" && paymentMethod === "TRANSFER") {
        setBankTransferModalOpen(true);
      }
    } catch (error) {
      const apiError = getApiError(error);
      notification.error({
        title:
          apiError.message || "Bị lỗi khi thanh toán, vui lòng thử lại sau",
      });

      setBankTransferModalOpen(false);
    }
  };

  if (isError) {
    navigate("/");
    return;
  }

  const canPlaceOrder =
    orderDetail?.orderItems?.some((item) => item.currentStatus === "NEW") ??
    false;

  return (
    <Drawer
      placement="right"
      width={500}
      open={open}
      onClose={onClose}
      loading={isLoading}
      title={null}
      styles={{
        body: {
          padding: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        },
      }}
    >
      {/* HEADER */}
      <div className="px-5 py-4 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Đơn gọi món</h2>

            <Text className="text-gray-500 text-sm">
              {orderDetail?.diningTableName}
            </Text>
          </div>

          <Tag color="red">{orderDetail?.orderItems?.length} món</Tag>
        </div>

        <div className="mt-3 text-sm text-gray-500">
          Nhân viên:{" "}
          <span className="font-medium text-gray-700">
            {orderDetail?.staffName}
          </span>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4">
        <div className="flex flex-col gap-4">
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
      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-100 bg-white px-5 py-4">
        {/* TOTAL */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-base text-gray-500">Tổng thanh toán</span>

          <span className="text-2xl font-bold text-red-500">
            {formatPrice(orderDetail?.totalPrice || 0)}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="space-y-3">
          <Button
            type="primary"
            danger
            block
            size="large"
            onClick={() => onPlaceOrder()}
            disabled={!canPlaceOrder || placeOrderMutation.isPending}
          >
            Đặt món
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button size="large" onClick={() => setCashModalOpen(true)}>
              Tiền mặt
            </Button>

            <Button
              type="primary"
              size="large"
              onClick={() => onPayOrder("TRANSFER", 0)}
            >
              Chuyển khoản
            </Button>
          </div>
        </div>
      </div>

      {/* Modal thanh toán tiền mặt */}
      <PaymentCashModal
        cashModalOpen={cashModalOpen}
        setCashModalOpen={setCashModalOpen}
        totalPrice={orderDetail?.totalPrice as number}
        onPayOrder={onPayOrder}
      />

      {/* Modal thanh toán chuyển khoản */}
      <PaymentBankTransferModal
        bankTransferModalOpen={bankTransferModalOpen}
        setBankTransferModalOpen={setBankTransferModalOpen}
        orderId={orderId}
        totalPrice={orderDetail?.totalPrice || 0}
      />
    </Drawer>
  );
};
