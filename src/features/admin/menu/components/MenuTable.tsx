import { Popconfirm, Space, Table, type TableProps } from "antd";
import type { Menu } from "../types/menu";

const MenuTable = ({
  menus,
  handleDeleteMenu,
  isLoadingDelete,
  showUpdateModal,
}: {
  menus: Menu[];
  handleDeleteMenu: (menuId: string) => Promise<void>;
  isLoadingDelete: boolean;
  showUpdateModal: (menu: Menu) => void;
}) => {
  const columns: TableProps<Menu>["columns"] = [
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
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
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
          <a
            onClick={() =>
              showUpdateModal({
                _id: record._id,
                categoryId: record.categoryId,
                name: record.name,
                price: record.price,
                image: record.image,
                status: record.status,
              })
            }
          >
            Cập nhật
          </a>
          <Popconfirm
            title="Xóa món ăn"
            description="Bạn có chắc chắn muốn xóa món ăn này không?"
            okText="Đồng ý"
            cancelText="Hủy"
            okButtonProps={{ loading: isLoadingDelete }}
            onConfirm={() => handleDeleteMenu(record._id)}
          >
            <a>Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table<Menu> columns={columns} dataSource={menus} />;
};

export default MenuTable;
