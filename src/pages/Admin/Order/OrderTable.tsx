import { Space, Table, Tag, type TableProps } from "antd";
import type { OrderResponse } from "../../../types/order.type";
import Text from "antd/es/typography/Text";
import { formatPrice } from "../../../utils/formatPrice";
import formatDateTime from "../../../utils/formatDateTime";

type Props = {
  orders: OrderResponse[];
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      page: number;
      size: number;
    }>
  >;
  onShowOrderDetail: (orderId: string) => Promise<void>
};

export const OrderTable = (props: Props) => {
  const columns: TableProps<OrderResponse>["columns"] = [
    {
      title: "Mã hóa đơn",
      dataIndex: "orderId",
      key: "orderId",
      render: (id) => (
        <Text code style={{ fontSize: 12 }}>
          {id.slice(-6)}
        </Text>
      ),
    },
    {
      title: "Bàn",
      dataIndex: "diningTableName",
      key: "diningTableName",
      render: (name) => <Text strong>{name}</Text>,
    },
    {
      title: "Nhân viên",
      dataIndex: "staffName",
      key: "staffName",
      render: (staffName) => <Text>{staffName}</Text>,
    },

    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "right",
      render: (value) => (
        <Text strong style={{ color: "#cf1322" }}>
          {formatPrice(value)}
        </Text>
      ),
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === true ? "success" : "processing"}>
          {status === true ? "Đã thanh toán" : "Chưa thanh toán"}
        </Tag>
      ),
    },

    {
      title: "Phương thức",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method: string) => (
        <Tag color={method === "CASH" ? "green" : "blue"}>
          {method === "CASH" ? "Tiền mặt" : "Chuyển khoản"}
        </Tag>
      ),
    },

    {
      title: "Thời gian thanh toán",
      dataIndex: "paidAt",
      key: "paidAt",
      render: (time: string) => (
        <Text type="secondary">{formatDateTime(time)}</Text>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="medium">
          <a onClick={() => props.onShowOrderDetail(record.orderId)}>Xem chi tiết</a>
        </Space>
      ),
    },
  ];

  return (
    <Table<OrderResponse>
      columns={columns}
      dataSource={props.orders}
      pagination={{
        current: props.pagination?.page + 1 || 1,
        pageSize: props.pagination?.size || 15,
        total: props.pagination?.totalElements,
        showSizeChanger: true,
      }}
      onChange={(pager) => {
        props.setPagination({
          page: (pager.current ?? 1) - 1,
          size: pager.pageSize ?? 10,
        });
      }}
    />
  );
};
