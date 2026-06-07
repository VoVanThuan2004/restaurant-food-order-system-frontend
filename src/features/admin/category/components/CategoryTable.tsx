import { Popconfirm, Space, Table, type TableProps } from "antd";
import formatDateTime from "../../../../utils/formatDateTime";
import { useDeleteCategoryMutation } from "../hooks/useCategoryMutation";

interface Category {
  _id: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategoryTable = ({
  categories,
  showUpdateModal,
}: {
  categories: Category[];
  showUpdateModal: (_id: string, categoryName: string) => void;
}) => {
  const deleteMutation = useDeleteCategoryMutation();

  const columns: TableProps<Category>["columns"] = [
    {
      title: "Tên danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string | Date) => formatDateTime(value),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },

    {
      title: "Thời gian cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value: string | Date) => formatDateTime(value),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Category) => (
        <Space size="middle">
          <a onClick={() => showUpdateModal(record._id, record.categoryName)}>Cập nhật</a>
          <Popconfirm
            title="Xóa danh mục"
            description="Bạn có chắc chắn muốn xóa danh mục này?"
            okText="Đồng ý"
            cancelText="Hủy"
            okButtonProps={{ loading: deleteMutation.isPending }}
            onConfirm={() => {
              deleteMutation.mutate(record._id);
            }}
          >
            <a>Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table<Category> rowKey={"_id"} columns={columns} dataSource={categories} />
  );
};

export default CategoryTable;
