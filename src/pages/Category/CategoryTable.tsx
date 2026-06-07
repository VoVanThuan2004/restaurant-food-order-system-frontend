import { Popconfirm, Space, type TableProps } from "antd";
import type { CategoryResponse } from "../../types/category.type";
import formatDateTime from "../../utils/formatDateTime";
import { useDeleteCategory } from "../../hooks/category/useDeleteCategory";
import TableComponent from "../../components/TableComponent";

const CategoryTable = ({
  categories,
  showUpdateModal,
}: {
  categories: CategoryResponse[];
  showUpdateModal: (_id: string, categoryName: string) => void;
}) => {
    const deleteMutation = useDeleteCategory();

  const columns: TableProps<CategoryResponse>["columns"] = [
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
      render: (_: unknown, record: CategoryResponse) => (
        <Space size="middle">
          <a
            onClick={() =>
              showUpdateModal(record.categoryId, record.categoryName)
            }
          >
            Cập nhật
          </a>
          <Popconfirm
            title="Xóa danh mục"
            description="Bạn có chắc chắn muốn xóa danh mục này?"
            okText="Đồng ý"
            cancelText="Hủy"
            okButtonProps={{ loading: deleteMutation.isPending }}
            onConfirm={() => {
              deleteMutation.mutate(record.categoryId);
            }}
          >
            <a>Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <TableComponent<CategoryResponse>
      rowKey={"categoryId"}
      columns={columns}
      dataSource={categories}
    />
  );
};

export default CategoryTable;
