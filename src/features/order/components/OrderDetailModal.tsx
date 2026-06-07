import { Button, Modal } from "antd";
import { useState } from "react";
import OrderItem from "./OrderItem";

const OrderDetailModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const showLoading = () => {
    setIsOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Modal
      title={
        <>
          <h1 className="text-xl font-bold">Order Details</h1>
          <div className="flex items-center gap-2 text-red-500">
            <p>#ORD-12345</p>
            <p>Bàn 01</p>
          </div>

          <div className="border border-gray-100"></div>
        </>
      }
      footer={
        <Button type="primary" onClick={showLoading}>
          Reload
        </Button>
      }
      
      loading={loading}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
    >
      <OrderItem />
      <OrderItem />
      <OrderItem />

      {/* Tiền */}
      <div className="space-y-3 text-sm mt-3">
        {/* Tiền nhận */}
        <div className="flex justify-between items-center text-gray-600">
          <span>Tiền nhận</span>
          <span className="font-medium text-gray-800">450.000 ₫</span>
        </div>

        {/* Tiền thối */}
        <div className="flex justify-between items-center text-gray-600">
          <span>Tiền thối</span>
          <span className="font-medium text-gray-800">50.000 ₫</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-2" />

        {/* Tổng tiền */}
        <div className="flex justify-between items-center text-xl font-bold">
          <span className="text-gray-900">Tổng tiền</span>
          <span className="text-red-600">500.000 ₫</span>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
