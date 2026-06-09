import { Modal } from "antd";
import type { OrderItem, OrderResponse } from "../../../types/order.type";
import { formatPrice } from "../../../utils/formatPrice";
import { OrderItemCard } from "./OrderItemCard";

export const OrderDetailModal = ({
  isOpen,
  setIsOpen,
  isLoading,
  orderDetail,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  orderDetail?: OrderResponse;
}) => {
  if (!orderDetail) {
    return null;
  }

  return (
    <Modal
      title={
        <>
          <h1 className="text-xl font-bold">Chi tiết hóa đơn</h1>
          <div className="flex items-center gap-2 text-red-500">
            <p>{orderDetail?.diningTableName}</p>
          </div>

          <div className="border border-gray-100"></div>
        </>
      }
      loading={isLoading}
      open={isOpen}
      centered
      footer={null}
      onCancel={() => setIsOpen(false)}
    >
      {orderDetail?.orderItems
        ?.filter((orderItem): orderItem is OrderItem => orderItem !== undefined)
        .map((orderItem) => (
          <OrderItemCard key={orderItem.orderItemId} item={orderItem} />
        ))}

      {/* Tiền */}
      <div className="space-y-3 text-sm mt-3">
        {/* Tiền nhận */}
        <div className="flex justify-between items-center text-gray-600">
          <span>Tiền nhận</span>
          <span className="font-medium text-gray-800">
            {formatPrice(orderDetail?.amountReceived || 0)}
          </span>
        </div>

        {/* Tiền thối */}
        <div className="flex justify-between items-center text-gray-600">
          <span>Tiền thối</span>
          <span className="font-medium text-gray-800">
            {formatPrice(orderDetail?.changeAmount || 0)}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-2" />

        {/* Tổng tiền */}
        <div className="flex justify-between items-center text-xl font-bold">
          <span className="text-gray-900">Tổng tiền</span>
          <span className="text-red-600">
            {formatPrice(orderDetail?.totalPrice || 0)}
          </span>
        </div>
      </div>
    </Modal>
  );
};
