import { Popconfirm, Space, Table, Tag, type TableProps } from "antd";
import type { User, UserUpdateDTO } from "../types/user";

type Props = {
  users: User[];
  isLoadingActive: boolean;
  handleIsActiveUser: (_id: string) => void;
  showUpdateModal: (userId: string, user: UserUpdateDTO) => void;
  setPagination: React.Dispatch<
    React.SetStateAction<{
      current: number;
      pageSize: number;
    }>
  >;
  pagination: {
    page: number;
    limit: number;
    totalUsers: number;
    totalPages: number;
  };
};

const UserTable = (props: Props) => {
  const columns: TableProps<User>["columns"] = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imageUrl) => (
        <img src={imageUrl} alt="menu-image" className="w-15 rounded-sm" />
      ),
    },
    {
      title: "Tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },

    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => <p>{gender === 1 ? "Nam" : "Nữ"}</p>,
    },

    {
      title: "Role",
      dataIndex: "roleName",
      key: "roleName",
      render: (roleName) => (
        <p>{roleName === "CHEF" ? "Đầu bếp" : "Nhân viên"}</p>
      ),
    },

    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag key={isActive} color={isActive === true ? "success" : "error"}>
          {isActive ? "Hoạt động" : "Đã khóa"}
        </Tag>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title={record.isActive ? "Khóa tài khoản" : "Mở khóa tài khoản"}
            description={`Bạn có chắc chắn muốn ${record.isActive ? "khóa" : "mở"} tài khoản này không`}
            okText="Đồng ý"
            cancelText="Hủy"
            okButtonProps={{ loading: props.isLoadingActive }}
            onConfirm={() => props.handleIsActiveUser(record._id)}
          >
            <a>{record.isActive ? "Khóa" : "Mở khóa"}</a>
          </Popconfirm>
          <a
            onClick={() =>
              props.showUpdateModal(record._id, {
                fullName: record.fullName,
                phoneNumber: record.phoneNumber,
                gender: record.gender,
                roleName: record.roleName,
              })
            }
          >
            Cập nhật
          </a>
          <a>Xóa</a>
        </Space>
      ),
    },
  ];

  return (
    <Table<User>
      columns={columns}
      dataSource={props.users}
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

export default UserTable;
