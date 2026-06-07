import type { TableProps } from "antd";
import { Avatar, Tag } from "antd";
import TableComponent from "../../../components/TableComponent";
import type { UserResponse } from "../../../types/user.type";
import { EditOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Tooltip } from "antd";

type Props = {
  users: UserResponse[];
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
  onActiveUser: (userId: string) => void;
  onEditUser: (user: UserResponse) => void;
};

export const UserTable = (props: Props) => {
  const { users, pagination, setPagination, total, loading, onActiveUser, onEditUser } =
    props;

  const columns: TableProps<UserResponse>["columns"] = [
    {
      title: "Avatar",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      width: 70,
      render: (avatarUrl, record) => {
        // Lấy chữ cái đầu tiên của tên để làm avatar fallback
        const firstLetter = record.fullName?.charAt(0).toUpperCase() || "U";
        return (
          <Avatar
            src={avatarUrl}
            size={40}
            style={{
              backgroundColor: "#87d068",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!avatarUrl && firstLetter}
          </Avatar>
        );
      },
    },
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
      key: "fullName",
      width: 150,
      render: (fullName) => <span className="font-medium">{fullName}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 180,
      render: (email) => (
        <span title={email} className="truncate">
          {email}
        </span>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 130,
      render: (phoneNumber) => <span>{phoneNumber || "Chưa cập nhật"}</span>,
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      width: 120,
      render: (dateOfBirth) => {
        if (!dateOfBirth) return <span>-</span>;
        return (
          <span>
            {new Date(dateOfBirth).toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
        );
      },
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      width: 100,
      render: (gender) => (
        <Tag color={gender === 1 ? "blue" : "magenta"}>
          {gender === 1 ? "Nam" : gender === 0 ? "Nữ" : "Khác"}
        </Tag>
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "roles",
      key: "roles",
      width: 150,
      render: (roles) => (
        <span>
          {roles && roles.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {roles.map((role: any, index: any) => (
                <Tag key={index} color="cyan">
                  {role.roleName === "ADMIN"
                    ? "Quản trị viên"
                    : role.roleName === "CHEF"
                      ? "Đầu bếp"
                      : role.roleName === "STAFF"
                        ? "Nhân viên"
                        : role}
                </Tag>
              ))}
            </div>
          ) : (
            <span>-</span>
          )}
        </span>
      ),
    },

    // Trạng thái tài khoản
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      width: 120,
      render: (active) => (
        <Tag color={active ? "green" : "red"}>
          {active ? "Đang hoạt động" : "Đã khóa"}
        </Tag>
      ),
    },

    {
      title: "Hành động",
      key: "actions",
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <Space>
          {/* Cập nhật */}
          <Tooltip title="Cập nhật">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEditUser(record)}
            />
          </Tooltip>

          {/* Khóa / Mở khóa */}
          <Popconfirm
            title={
              record.active ? "Khóa tài khoản này?" : "Mở khóa tài khoản này?"
            }
            okText="Xác nhận"
            cancelText="Hủy"
            onConfirm={() => onActiveUser(record.userId)}
          >
            <Tooltip
              title={record.active ? "Khóa tài khoản" : "Mở khóa tài khoản"}
            >
              <Button
                type="text"
                danger={record.active}
                icon={record.active ? <LockOutlined /> : <UnlockOutlined />}
              />
            </Tooltip>
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
    <TableComponent<UserResponse>
      columns={columns}
      dataSource={users}
      rowKey="userId" // unique key
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
