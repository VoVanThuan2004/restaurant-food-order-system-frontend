import { Popconfirm, Space, type TableProps } from "antd";
import type { DishResponse } from "../../../types/dish.type";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../utils/formatPrice";
import TableComponent from "../../../components/TableComponent";

type Props = {
  dishes: DishResponse[];
  pagination: {
    page: number;
    size: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      page: number;
      size: number;
    }>
  >;
  total: number;
  loading?: boolean;
};

export const DishTable = (props: Props) => {
  const navigate = useNavigate();
  const { dishes, pagination, setPagination, total, loading } = props;

  const columns: TableProps<DishResponse>["columns"] = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (imageUrl) => (
        <img src={imageUrl} alt="menu-image" className="w-15 rounded-sm" />
      ),
    },
    {
      title: "Tên món ăn",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <a
          onClick={() => navigate(`/admin/dish/${record.dishId}`)}
        >
          {record.name}
        </a>
      ),
    },
    {
      title: "Giá",
      dataIndex: "basePrice",
      key: "basePrice",
      render: (price) => (
        <p>{formatPrice(price)}</p>
      )
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <p
          className={`font-medium ${status ? "text-green-400" : "text-red-400"}`}
        >
          {status ? "Hoạt động" : "Đã tắt"}
        </p>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title={record.status ? "Tắt món ăn" : "Bật món ăn"}
            description={`Bạn có chắc chắn muốn ${record.status ? "tắt món ăn này" : "bật món ăn này"}`}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <a>{record.status ? "Tắt món ăn" : "Bật món ăn"}</a>
          </Popconfirm>
          <a onClick={() => navigate(`/admin/dish/${record.dishId}`)}>Cập nhật</a>
          <Popconfirm
            title="Xóa món ăn"
            description="Bạn có chắc chắn muốn xóa món ăn này không?"
            okText="Đồng ý"
            cancelText="Hủy"
            okButtonProps={{ loading: false }}
            onConfirm={() => alert("Hello")}
          >
            <a>Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleTableChange = (newPagination: any) => {
    setPagination({
      page: newPagination.current,
      size: newPagination.pageSize,
    });
  };

  return (
    <TableComponent<DishResponse>
      columns={columns}
      dataSource={dishes}
      rowKey="dishId" // unique key
      loading={loading}
      pagination={{
        current: pagination.page + 1,
        pageSize: pagination.size,
        total: total || 0,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        onChange: (page, pageSize) => {
          setPagination({ page: page - 1, size: pageSize });
        },
      }}
      onChange={handleTableChange}
    />
  );
};
