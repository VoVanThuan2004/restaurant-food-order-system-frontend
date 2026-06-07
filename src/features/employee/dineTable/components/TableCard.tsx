import { Button, Modal, notification } from "antd";
import { Users, ChevronRight } from "lucide-react";
import { useState } from "react";
import { createOrder } from "../api/create-order";
import type { ApiError } from "../../../../types/api.error";
import { useNavigate } from "react-router-dom";

const TableCard = ({
  _id,
  tableName,
  seats,
  status,
}: {
  _id: string;
  tableName: string;
  seats: number;
  status: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    // Gọi api tạo hóa đơn
    try {
      const data = await createOrder(_id);

      localStorage.setItem("orderId", data.data.orderId);
      navigate("/menu");
      setIsModalOpen(false);
    } catch (error) {
      const err = error as { response?: { data?: ApiError } };

      notification.error({
        title: "Lỗi khi tạo bàn cho khách",
        description: err?.response?.data?.message || "Lỗi hệ thống",
        placement: "topRight",
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`flex flex-col py-3 px-4 w-full rounded-xl border hover:shadow-md transition
        ${status ? "bg-white border-green-300" : "bg-red-50 border-red-200"}
      `}
    >
      <div className="flex items-center justify-between">
        {/* Table name & status */}
        <p className="text-xl font-bold">{tableName}</p>
        <div
          className={`px-2 py-1 rounded-2xl border ${status ? "border-green-400 bg-green-50" : "border-red-400 bg-red-100"}`}
        >
          <p
            className={`text-[13px] font-semibold ${status ? "text-green-600" : "text-red-600"}`}
          >
            {status ? "Available" : "Occupied"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Users size={16} color="gray" />
        <p className="text-gray-500">{seats} SEATS</p>
      </div>

      {/* Button */}
      <div className="flex items-center justify-center">
        <button
          className={`flex items-center justify-center gap-1 cursor-pointer mt-8 w-35 h-10 ${status ? "hover:bg-green-50 hover:rounded-2xl hover:border hover:border-green-300" : "hover:bg-red-100 hover:rounded-2xl hover:border hover:border-red-300"}`}
          onClick={showModal}
        >
          <p
            className={`${status ? "text-[#00DD00]" : "text-[#FF0033]"} font-medium`}
          >
            {status ? " Assign table" : "View detail"}
          </p>
          <ChevronRight size={15} color={`${status ? "#00DD00" : "#FF0033"}`} />
        </button>
      </div>

      <Modal
        title="Xác nhận tạo bàn"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Xác nhận
          </Button>,
        ]}
      ></Modal>
    </div>
  );
};

export default TableCard;
