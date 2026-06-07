import Spinner from "../../../components/Spinner";
import { useState } from "react";
import { useAllUsers } from "../../../hooks/user/useAllUsers";
import { UserTable } from "./UserTable";
import { AddUserModal } from "./AddUserModal";
import { UpdateUserModal } from "./UpdateUserModal";
import { Search, Plus } from "lucide-react";
import { useActiveUser } from "../../../hooks/user/useActiveUser";
import type { UserResponse } from "../../../types/user.type";

export const UserPage = () => {
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

  // Gọi hook lấy danh sách users
  const { data, isLoading, isError } = useAllUsers({
    page: pagination.page,
    size: pagination.size,
    search: searchQuery,
  });

  const users = data?.data?.content || [];

  // Gọi hook active user
  const activeUserMutation = useActiveUser();

  const onActiveUser = (userId: string) => {
    activeUserMutation.mutate(userId);
  };

  const onEditUser = (user: UserResponse) => {
    setSelectedUser(user);
    setOpenUpdateModal(true);
  };

  return (
    <div className="px-5 mt-5">
      {isError && <div>Error</div>}

      {/* Header với Search và Button */}
      <div className="flex items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
            />
          </div>
        </div>

        {/* Thêm người dùng Button */}
        <button
          onClick={() => setOpenAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm người dùng</span>
        </button>
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Spinner color="37baff" />
          </div>
        )}
        <UserTable
          users={users}
          loading={isLoading}
          pagination={pagination}
          setPagination={setPagination}
          total={data?.data?.totalElements as number}
          onActiveUser={onActiveUser}
          onEditUser={onEditUser}
        />
      </div>

      {/* Modal thêm người dùng */}
      <AddUserModal
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        onSuccess={() => {
          // Refetch data after successful creation
          setPagination({ page: 0, size: 10 });
        }}
      />

      {/* Modal cập nhật người dùng */}
      <UpdateUserModal
        open={openUpdateModal}
        user={selectedUser}
        onCancel={() => {
          setOpenUpdateModal(false);
          setSelectedUser(null);
        }}
        onSuccess={() => {
          // Refetch data after successful update
          setPagination({ page: 0, size: 10 });
        }}
      />
    </div>
  );
};
