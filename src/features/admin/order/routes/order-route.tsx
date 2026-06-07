import { DatePicker, Select } from "antd";
import OrderTable from "../components/OrderTable";
import { useFilterOrders } from "../hooks/useFilterOrders";
import Spinner from "../../../../components/Spinner";
import { useState } from "react";
import type { Dayjs } from "dayjs";
import OrderDetail from "../components/OrderDetail";
import type { ApiError } from "../../../../types/api.error";
import { getOrderDetailApi } from "../api/get-order-detail";
import type { OrderDetailType } from "../types/order-detail";

const AdminOrderRoute = () => {
  const { RangePicker } = DatePicker;

  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [shift, setShift] = useState<string | undefined>();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoadingOrderDetail, setIsLoadingOrderDetail] =
    useState<boolean>(false);
  const [orderDetail, setOrderDetail] = useState<OrderDetailType | null>(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { data, isLoading, isError } = useFilterOrders({
    startDate,
    endDate,
    shift,
    page: pagination.current,
    limit: pagination.pageSize
  });
  const orders = data?.data || [];
  const paginationData = data?.pagination || {
    page: 1,
    limit: pagination.pageSize,
    totalUsers: 0,
    totalPages: 1,
  };

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

  const showOrderDetail = async (orderId: string) => {
    if (!orderId) return;

    setIsOpen(true);
    // Gọi api lấy chi tiết đơn hàng
    setIsLoadingOrderDetail(true);
    try {
      const data = await getOrderDetailApi(orderId);

      setOrderDetail(data.data || null);
    } catch (error) {
      const err = error as { response?: { data?: ApiError } };
      console.log(err);
    } finally {
      setIsLoadingOrderDetail(false);
    }
  };

  return (
    <div className="px-5 mt-5">
      {isError && <div>Error</div>}

      <div className="flex items-center gap-3 mb-5">
        {/* Filter thời gian + ca làm việc*/}
        <RangePicker
          onChange={handleChangeDate}
          format="YYYY-MM-DD"
          placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
        />
        <Select
          showSearch={{
            filterOption: (input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase()),
          }}
          placeholder="Chọn ca làm việc"
          style={{ width: 180 }}
          onChange={(value) => setShift(value)}
          options={[
            {
              value: "MORNING",
              label: "Ca sáng",
            },
            {
              value: "AFTERNOON",
              label: "Ca chiều",
            },
            {
              value: "EVENING",
              label: "Ca tối",
            },
          ]}
        />
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Spinner color="37baff" />
          </div>
        )}

        <OrderTable orders={orders} showOrderDetail={showOrderDetail} pagination={paginationData} setPagination={setPagination}/>
      </div>

      <OrderDetail
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={isLoadingOrderDetail}
        orderDetail={orderDetail}
      />
    </div>
  );
};

export default AdminOrderRoute;
