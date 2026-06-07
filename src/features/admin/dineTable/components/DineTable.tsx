import { Popconfirm, Space, Table, Tag, type TableProps } from "antd";
import type { DineTableType, DineTableUpdateDTO } from "../types/dine-table";

type Props = {
  dineTables: DineTableType[];
  showUpdateModal: (dineTableId: string, dineTable: DineTableUpdateDTO) => void;
  isLoadingDelete: boolean;
  handleDelete: (dineTableId: string) => void;
};

const DineTable = (props: Props) => {
  const columns: TableProps<DineTableType>["columns"] = [
    {
      title: "Tên bàn",
      dataIndex: "tableName",
      key: "tableName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => <p>{quantity}</p>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag key={status} color={status === true ? "success" : "error"}>
          {status ? "Trống" : "Đang dùng"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              props.showUpdateModal(record._id, {
                tableName: record.tableName,
                quantity: record.quantity,
              })
            }
          >
            Cập nhật
          </a>

          <Popconfirm
            title="Xóa bàn ăn"
            description="Bạn có chắc chắn muốn xóa bàn ăn này không?"
            okText="Đồng ý"
            cancelText="Hủy"
            okButtonProps={{ loading: props.isLoadingDelete }}
            onConfirm={() => props.handleDelete(record._id)}
          >
            <a>Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table<DineTableType>
      rowKey={"_id"}
      columns={columns}
      dataSource={props.dineTables}
    />
  );
};

export default DineTable;
