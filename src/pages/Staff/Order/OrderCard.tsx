import type { OrderPaymentResponse } from "../../../types/order.type";
import { formatPrice } from "../../../utils/formatPrice";
import { Clock, CreditCard } from "lucide-react";
import formatDateTime from "../../../utils/formatDateTime";

export const OrderCard = (order: OrderPaymentResponse) => {

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case "CASH":
        return "text-green-600";
      case "TRANSFER":
        return "text-blue-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-md w-full px-5 py-4 mt-5 mx-auto">
      <p className="text-[13px] text-gray-400 mt-1">
        Mã hóa đơn:{" "}
        <span className="font-semibold text-gray-600">{order.orderId}</span>
      </p>

      {/* Tên bàn + trạng thái thanh toán */}
      <div className="flex justify-between items-center mt-3">
        <h2 className="text-2xl font-bold">{order.diningTableName}</h2>
        <div
          className={`px-3 py-1 rounded-2xl border border-green-400 bg-green-50`}
        >
          {/* <p className={`text-[13px] font-semibold text-green-600 text-center`}>
            {order.}
          </p> */}
        </div>
      </div>

      {/* Tên nhân viên */}
      <p className="text-[17px] text-gray-400 font-semibold mb-4">
        Nhân viên: {order.staffName}
      </p>

      <div className="">
        <div className="border border-t-1 border-gray-300"></div>
      </div>

      {/* Tiền nhận */}
      <div className="flex items-center justify-between mt-2">
        <p className="text-gray-500 text-[16px]">Tiền nhận</p>
        <p className="text-[17px]">
          {formatPrice(order.amountReceived || 0)}
        </p>
      </div>

      {/* Tiền thối */}
      <div className="flex items-center justify-between mt-2">
        <p className="text-gray-500 text-[16px]">Tiền thối</p>
        <p className="text-[17px]">{formatPrice(order.changeAmount || 0)}</p>
      </div>

      {/* Tổng tiền */}
      <div className="flex items-center justify-between mt-3 mb-4">
        <p className="text-xl font-extrabold">Tổng tiền (Total)</p>
        <p className="text-xl text-red-500 font-extrabold">
          {formatPrice(order.totalPrice)}
        </p>
      </div>

      <div className="">
        <div className="border border-t-1 border-gray-300"></div>
      </div>

      {/* Phương thức thanh toán */}
      <div className="flex items-center mt-3 gap-2">
        <CreditCard className="text-gray-500" size={20} />
        <p className="text-gray-500">Method:</p>
        <p
          className={`font-semibold ${getPaymentMethodColor(order.paymentMethod)}`}
        >
          {order.paymentMethod}
        </p>
      </div>

      {/* Thời gian thanh toán */}
      <div className="flex items-center mt-2 gap-2">
        <Clock className="text-gray-500" size={20} />
        <p className="text-gray-500">
          Thời gian thanh toán: {formatDateTime(order.paidAt)}
        </p>
      </div>

      <div className="flex justify-center">
        <button
          className="px-20 py-3 bg-white border-[2px] border-red-6=500 rounded-xl text-red-500 text-[18px] font-semibold cursor-pointer mt-5 hover:shadow-sm"
        //   onClick={() => setIsOpen(true)}
        >
          Xem chi tiết
        </button>
      </div>

      {/* <OrderDetailModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </div>
  );
};
