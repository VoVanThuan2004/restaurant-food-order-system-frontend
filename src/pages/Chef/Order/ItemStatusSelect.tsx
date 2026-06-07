import { Select } from "antd";
import { OrderItemStatus } from "../../../types/order-item.type";

type Props = {
  status: OrderItemStatus;
  onChange: (status: OrderItemStatus) => void;
};

const STATUS_TRANSITIONS: Record<OrderItemStatus, OrderItemStatus[]> = {
  NEW: [OrderItemStatus.PENDING],

  PENDING: [OrderItemStatus.ACCEPTED, OrderItemStatus.CANCELLED],

  ACCEPTED: [OrderItemStatus.PREPARING],

  PREPARING: [OrderItemStatus.READY],

  READY: [OrderItemStatus.SERVED],

  SERVED: [],

  CANCELLED: [],
};

const STATUS_LABELS: Record<OrderItemStatus, string> = {
  NEW: "Mới",
  PENDING: "Chờ xác nhận",
  ACCEPTED: "Đã nhận món",
  PREPARING: "Đang chế biến",
  READY: "Sẵn sàng phục vụ",
  SERVED: "Đã phục vụ",
  CANCELLED: "Đã hủy",
};

const ItemStatusSelect = (props: Props) => {
  const nextStatuses = STATUS_TRANSITIONS[props.status];

  const options = nextStatuses.map((status) => ({
    label: STATUS_LABELS[status],
    value: status,
  }));

  return (
    <Select
      className="w-full"
      placeholder="Cập nhật trạng thái"
      defaultValue={STATUS_LABELS[props.status]}
      options={options}
      disabled={options.length === 0}
      onChange={(value) => props.onChange(value as OrderItemStatus)}
    />
  );
};

export default ItemStatusSelect;
