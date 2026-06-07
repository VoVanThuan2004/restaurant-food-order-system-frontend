import { Button, InputNumber, message, Modal, Tag } from "antd";
import CartItem from "./CartItem";
import formatCurrency from "../../../../utils/formatCurrency";
import { useGetOrderItems } from "../hooks/useGetOrderItems";
import type { OrderItem } from "../types/order-item";
import { useSendOrder } from "../hooks/useSendOrder";
import { useConfirmItemSocket } from "../hooks/useConfirmItemSocket";
import { useState } from "react";
import { payOrderApi } from "../api/pay-order";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Props = {
  isOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const CartModal = (props: Props) => {
  // Gọi api lấy danh order-items trong đơn hàng
  const orderId = localStorage.getItem("orderId");
  const { data, isLoading, isError } = useGetOrderItems(orderId);
  const orderDetail = data?.data;

  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [cashModalOpen, setCashModalOpen] = useState(false);
  const [cashReceived, setCashReceived] = useState<number | null>(null);
  const changeMoney = (cashReceived || 0) - (orderDetail?.totalPrice || 0);

  const navigate = useNavigate();

  useConfirmItemSocket();

  // Gọi api gửi món xuống bếp
  const useSendOrderMutate = useSendOrder();

  if (isError) {
    alert("Lỗi hệ thống");
  }

  // Gọi món xuống bếp
  const handleSendOrder = () => {
    useSendOrderMutate.mutate(orderId);
  };

  const handleCashCheckout = async () => {
    const total = orderDetail?.totalPrice || 0;

    if ((cashReceived || 0) < total) {
      message.error("Tiền khách đưa không đủ");
      return;
    }

    // call API thanh toán
    setIsPaymentLoading(true);
    try {
      const res = await payOrderApi({
        orderId: localStorage.getItem("orderId") as string,
        paymentMethod: "CASH",
        amountReceived: cashReceived as number,
      });

      if (res.status === "success") {
        message.success("Thanh toán thành công");
        navigate("/payment-history");
        localStorage.removeItem("orderId");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const messageError = error.response?.data?.message;
        message.error(messageError || "Có lỗi xảy ra");
      } else {
        message.error("Lỗi hệ thống");
      }
    } finally {
      setIsPaymentLoading(false);
      setCashModalOpen(false);
    }
  };

  const handleVNPayCheckout = async () => {
    setIsPaymentLoading(true);
    try {
      const res = await payOrderApi({
        orderId: localStorage.getItem("orderId") as string,
        paymentMethod: "VNPAY",
        amountReceived: orderDetail?.totalPrice,
      });

      if (res.status === "success") {
        const paymentUrl = res.data;

        window.location.href = paymentUrl;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errMessage = error.response?.data?.message;

        message.error(errMessage);
      } else {
        message.error("Lỗi hệ thống");
      }
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <>
      <Modal
        destroyOnClose
        title={
          <div className="flex justify-between items-center">
            <h2>Giỏ hàng</h2>

            <Tag color="#cd201f">3 món</Tag>
          </div>
        }
        footer={
          <div className="flex flex-col gap-3 mt-5">
            <Button
              size="large"
              color="danger"
              variant="outlined"
              onClick={() => handleSendOrder()}
            >
              Gọi món
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button size="large" onClick={() => setCashModalOpen(true)}>
                Tiền mặt
              </Button>

              <Button type="primary" size="large" onClick={() => handleVNPayCheckout()}>
                VNPay
              </Button>
            </div>
          </div>
        }
        closable={{ "aria-label": "Custom Close Button" }}
        loading={isLoading}
        open={props.isOpen}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      >
        {orderDetail?.orderItems.map((item: OrderItem) => (
          <CartItem key={item._id} orderItem={item} />
        ))}

        {/* Tiền */}
        <div className="space-y-3 text-sm mt-7">
          {/* Tổng tiền */}
          <div className="flex justify-between items-center text-xl font-bold">
            <span className="text-gray-900">Tổng tiền</span>
            <span className="text-red-600">
              {formatCurrency(orderDetail?.totalPrice || 0)}
            </span>
          </div>
        </div>
      </Modal>

      <Modal
        title="Thanh toán tiền mặt"
        open={cashModalOpen}
        onCancel={() => setCashModalOpen(false)}
        footer={null}
      >
        <div className="space-y-4">
          {/* Tổng tiền */}
          <div className="flex justify-between text-lg font-semibold">
            <span>Tổng tiền</span>
            <span className="text-red-600">
              {formatCurrency(orderDetail?.totalPrice || 0)}
            </span>
          </div>

          {/* Tiền nhận */}
          <div>
            <label className="text-sm text-gray-500">Tiền khách đưa</label>
            <InputNumber
              style={{ width: "100%" }}
              size="large"
              min={0}
              value={cashReceived || undefined}
              onChange={(value) => setCashReceived(Number(value))}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </div>

          {/* Tiền thối */}
          <div className="flex justify-between text-base">
            <span>Tiền thối</span>
            <span className="font-semibold">
              {formatCurrency(changeMoney > 0 ? changeMoney : 0)}
            </span>
          </div>

          <Button
            type="primary"
            block
            size="large"
            disabled={changeMoney < 0}
            loading={isPaymentLoading}
            onClick={() => handleCashCheckout()}
          >
            Thanh toán
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CartModal;
