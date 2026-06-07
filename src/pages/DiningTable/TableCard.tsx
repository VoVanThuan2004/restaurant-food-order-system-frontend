import { Button, Modal, notification } from "antd";
import { ChevronRight, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkOrderApi, createOrderApi } from "../../services/order.api";
import { getApiError } from "../../utils/get-api-error";
import ButtonComponent from "../../components/Button";

const TableCard = ({
  diningTableId,
  name,
  capacity,
  status,
  userId,
}: {
  diningTableId: string;
  name: string;
  capacity: number;
  status: boolean;
  userId: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    // Gọi api tạo hóa đơn
    try {
      if (status) {
        const res = await createOrderApi({
          userId,
          diningTableId,
        });

        navigate(`/orders/${res.data}/dish`);
      } else {
        const res = await checkOrderApi({
          userId,
          diningTableId,
        });

        navigate(`/orders/${res.data}/dish`);
      }

      setIsModalOpen(false);
    } catch (error) {
      const apiError = getApiError(error);

      notification.error({
        title: "Lỗi khi tạo bàn cho khách",
        description: apiError.message || "Lỗi hệ thống",
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
        <p className="text-xl font-bold">{name}</p>
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
        <p className="text-gray-500">{capacity} SEATS</p>
      </div>

      {/* Button */}
      <div className="flex items-center justify-center">
        <ButtonComponent
          type="button"
          onClick={showModal}
          customBg="transparent"
          customHover={status ? "hover:bg-green-50" : "hover:bg-red-100"}
          customText={status ? "text-[#00DD00]" : "text-[#FF0033]"}
          className={`
          cursor-pointer mt-8 w-40 h-10 gap-1
          ${
            status
              ? "hover:rounded-2xl hover:border hover:border-green-300"
              : "hover:rounded-2xl hover:border hover:border-red-300"
          }
        `}
        >
          <div className="flex items-center">
            <p
              className={`${status ? "text-[#00DD00]" : "text-[#FF0033]"} font-medium`}
            >
              {status ? " Assign table" : "View detail"}
            </p>
            <ChevronRight
              size={15}
              color={`${status ? "#00DD00" : "#FF0033"}`}
            />
          </div>
        </ButtonComponent>
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
