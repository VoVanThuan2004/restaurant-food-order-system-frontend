import { DatePicker, message } from "antd";
import { useOrdersAdmin } from "../../../hooks/order/useOrdersAdmin";
import { useState } from "react";
import { OrderTable } from "./OrderTable";
import Spinner from "../../../components/Spinner";
import type { Dayjs } from "dayjs";
import { getApiError } from "../../../utils/get-api-error";
import { getOrderDetailAdminApi } from "../../../services/order.api";
import type { OrderResponse } from "../../../types/order.type";
import { OrderDetailModal } from "./OrderDetailModal";

export const AdminOrderPage = () => {
  const { RangePicker } = DatePicker;

  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });
  const [isOpen, setIsOpen] = useState(false);

  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [orderDetail, setOrderDetail] = useState<OrderResponse>();
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // Gọi hook lấy danh sách orders
  const { data, isLoading } = useOrdersAdmin({
    page: pagination.page,
    size: pagination.size,
    startDate,
    endDate,
  });
  const orders = data?.data?.content || [];

  const handleChangeDate = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string],
  ) => {
    if (!dates) {
      setStartDate(undefined);
      setEndDate(undefined);
      return;
    }

    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
  };

  const onShowOrderDetail = async (orderId: string) => {
    if (!orderId) return;

    setIsOpen(true);
    setIsLoadingDetail(true);
    try {
      const res = await getOrderDetailAdminApi(orderId);
      setOrderDetail(res.data);
    } catch (error) {
      const apiError = getApiError(error);
      message.error(apiError.message || "Lỗi hệ thống, vui lòng thử lại!");
      setIsOpen(false);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  return (
    <div className="px-5 mt-5">
      <div className="flex items-center gap-3 mb-5">
        {/* Filter thời gian + ca làm việc*/}
        <RangePicker
          onChange={handleChangeDate}
          format="YYYY-MM-DD"
          placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
        />
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Spinner color="37baff" />
          </div>
        )}

        <OrderTable
          orders={orders}
          pagination={{
            page: pagination.page,
            size: pagination.size,
            totalElements: data?.data?.totalElements as number,
            totalPages: data?.data?.totalPages as number,
          }}
          setPagination={setPagination}
          onShowOrderDetail={onShowOrderDetail}
        />
      </div>

      <OrderDetailModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={isLoadingDetail}
        orderDetail={orderDetail as OrderResponse}
      />
    </div>
  );
};
