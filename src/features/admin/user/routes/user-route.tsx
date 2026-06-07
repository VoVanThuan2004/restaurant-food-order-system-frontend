import { Button } from "antd";
import UserTable from "../components/UserTable";
import { useGetUsers } from "../hooks/useGetUsers";
import Spinner from "../../../../components/Spinner";
import { useState } from "react";
import AddUserModal from "../components/AddUserModal";
import { useAddUserMutation } from "../hooks/useAddUserMutation";
import type { UserForm, UserUpdateDTO } from "../types/user";
import { useIsActiveUserMutation } from "../hooks/useIsActiveUserMutation";
import UpdateUserModal from "../components/UpdateUserModal";
import { useUpdateUserMutation } from "../hooks/useUpdateUserMutation";

const UserRoute = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [userIdUpdate, setUserIdUpdate] = useState<string>("");
  const [userUpdate, setUserUpdate] = useState<UserUpdateDTO>({
    fullName: "",
    phoneNumber: "",
    gender: 0,
    roleName: "",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Gọi hook api get users
  const { data, isLoading, isError } = useGetUsers(
    pagination.current,
    pagination.pageSize,
  );
  const users = data?.data || [];
  const paginationData = data?.pagination || {
    page: 1,
    limit: pagination.pageSize,
    totalUsers: 0,
    totalPages: 1,
  };

  // Gọi api thêm user
  const addUserMutate = useAddUserMutation({
    onDone: () => setIsOpenAddModal(false),
  });

  // Gọi api khóa - mở khóa tài khoản
  const isActiveUserMutate = useIsActiveUserMutation();

  // Gọi api cập nhật user
  const updateUserMutate = useUpdateUserMutation({
    onDone: () => setIsOpenUpdateModal(false),
  });

  const handleAddUser = (user: UserForm) => {
    addUserMutate.mutate(user);
  };

  const handleCancel = () => {
    setIsOpenAddModal(false);
  };

  //  Khóa - mở khóa tài khoản
  const handleIsActive = (_id: string) => {
    isActiveUserMutate.mutate(_id);
  };

  // Cập nhật tài khoản
  const showUpdateModal = (userId: string, user: UserUpdateDTO) => {
    setUserUpdate(user);
    setUserIdUpdate(userId);
    setIsOpenUpdateModal(true);
  };

  const handleSubmitUpdate = (user: UserUpdateDTO) => {
    updateUserMutate.mutate({
      userId: userIdUpdate,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      roleName: user.roleName,
    });
  };

  const handleCancelUpdate = () => {
    setIsOpenUpdateModal(false);
  };

  return (
    <div className="px-5 mt-5">
      {isError && <div>Error</div>}

      {/* Nút thêm người dùng */}
      <div className="flex justify-end mb-5">
        <Button type="primary" onClick={() => setIsOpenAddModal(true)}>
          Thêm người dùng
        </Button>
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Spinner color="37baff" />
          </div>
        )}
        <UserTable
          users={users}
          isLoadingActive={isActiveUserMutate.isPending}
          handleIsActiveUser={handleIsActive}
          showUpdateModal={showUpdateModal}
          setPagination={setPagination}
          pagination={paginationData}
        />
      </div>

      <AddUserModal
        isOpen={isOpenAddModal}
        isLoading={addUserMutate.isPending}
        handleSubmit={handleAddUser}
        handleCancel={handleCancel}
      />

      <UpdateUserModal
        isOpen={isOpenUpdateModal}
        isLoading={updateUserMutate.isPending}
        userData={userUpdate}
        handleSubmit={handleSubmitUpdate}
        handleCancel={handleCancelUpdate}
      />
    </div>
  );
};

export default UserRoute;
