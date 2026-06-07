import { Space, Table, Tag, Typography, type TableProps } from "antd";
import type { Order } from "../types/order";
import formatCurrency from "../../../../utils/formatCurrency";
import formatDateTime from "../../../../utils/formatDateTime";
const { Text } = Typography;

type Props = {
  orders: Order[];
  showOrderDetail: (orderId: string) => Promise<void>;
  pagination: {
    page: number;
    limit: number;
    totalUsers: number;
    totalPages: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      current: number;
      pageSize: number;
    }>
  >;
};

const OrderTable = (props: Props) => {
  const columns: TableProps<Order>["columns"] = [
    {
      title: "Mã hóa đơn",
      dataIndex: "_id",
      key: "_id",
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
      dataIndex: "waiter",
      key: "waiter",
      render: (waiter) => <Text>{waiter}</Text>,
    },

    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "right",
      render: (value) => (
        <Text strong style={{ color: "#cf1322" }}>
          {formatCurrency(value)}
        </Text>
      ),
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "PAID" ? "success" : "processing"}>
          {status === "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}
        </Tag>
      ),
    },

    {
      title: "Phương thức",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method: string) => (
        <Tag color={method === "CASH" ? "green" : "blue"}>
          {method === "CASH" ? "Tiền mặt" : "VNPay"}
        </Tag>
      ),
    },

    {
      title: "Thời gian thanh toán",
      dataIndex: "paymentTime",
      key: "paymentTime",
      render: (time: string) => (
        <Text type="secondary">{formatDateTime(time)}</Text>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="medium">
          <a onClick={() => props.showOrderDetail(record._id)}>Xem chi tiết</a>
        </Space>
      ),
    },
  ];

  return (
    <Table<Order>
      columns={columns}
      dataSource={props.orders}
      pagination={{
        current: props.pagination?.page || 1,
        pageSize: props.pagination?.limit || 15,
        total: props.pagination?.totalUsers,
        showSizeChanger: true,
      }}
      onChange={(pager) => {
        props.setPagination({
          current: pager.current ?? 1,
          pageSize: pager.pageSize ?? 10,
        });
      }}
    />
  );
};

export default OrderTable;
