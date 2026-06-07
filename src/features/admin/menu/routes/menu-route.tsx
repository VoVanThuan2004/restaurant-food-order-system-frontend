import React, { useMemo, useState } from "react";
import { Button, Select } from "antd";
import MenuTable from "../components/MenuTable";
import { useMenuByCategory } from "../hooks/useMenuByCategory";
import Spinner from "../../../../components/Spinner";
import { useAdminCategory } from "../../hooks/useAdminCategory";
import AddMenuModal from "../components/AddMenuModal";
import {
  useAddMenuMutation,
  useDeleteMenuMutation,
  useUpdateMenuMutation,
} from "../hooks/useMenuMutation";
import type { Menu, MenuDTO, MenuUpdateDTO } from "../types/menu";
import UpdateMenuModal from "../components/UpdateMenuModal";

type Category = {
  _id: string;
  categoryName: string;
};

const AdminMenuRoute = () => {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [menuUpdate, setMenuUpdate] = useState<Menu>({
    _id: "",
    categoryId: "",
    name: "",
    image: "",
    price: 0,
    status: false,
  });

  // Gọi hook api lấy danh sách menu theo category
  const { data, isLoading, isError } = useMenuByCategory({ categoryId });
  const menus = data?.data || [];

  // Gọi hook api lấy danh sách categories
  const { data: categoryData } = useAdminCategory();
  const categories = categoryData?.data || [];

  const categoryOptions = useMemo(() => {
    return [
      { value: null, label: "Tất cả" },
      ...categories.map((c: Category) => ({
        value: c._id,
        label: c.categoryName,
      })),
    ];
  }, [categories]);

  // Gọi api thêm món ăn
  const addMenuMutation = useAddMenuMutation({
    categoryId,
    onDone: () => setIsOpenAddModal(false),
  });

  // Gọi api xóa món ăn
  const deleteMutation = useDeleteMenuMutation({ categoryId });

  // Gọi api cập nhật món ăn
  const updateMutation = useUpdateMenuMutation({ categoryId, onDone: () => setIsOpenUpdateModal(false) });

  // Thêm món ăn
  const showAddModal = () => {
    setIsOpenAddModal(true);
  };

  const handleCancleAddModal = () => {
    setIsOpenAddModal(false);
  };

  const handleSubmitAddModal = ({
    categoryId,
    name,
    price,
    image,
  }: MenuDTO) => {
    addMenuMutation.mutate({ categoryId, name, price, image });
  };

  // Xóa món ăn
  const handleDeleteMenu = async (menuId: string) => {
    await deleteMutation.mutate(menuId);
  };

  // Cập nhật món ăn
  const showUpdateModal = (menu: Menu) => {
    setMenuUpdate(menu);
    setIsOpenUpdateModal(true);
  };

  const handleSubmitUpdateModal = (menu: MenuUpdateDTO) => {
    updateMutation.mutate(menu);
  };

  const handleCancleUpdateModal = () => {
    setMenuUpdate({
      _id: "",
      categoryId: "",
      name: "",
      image: "",
      price: 0,
      status: false,
    });
    setIsOpenUpdateModal(false);
  };

  return (
    <div className="px-5 mt-5">
      {isError && <div>Error</div>}

      {/* Lọc theo category + nút thêm menu */}
      <div className="flex justify-between mb-5">
        <Select
          showSearch={{
            filterOption: (input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase()),
          }}
          placeholder="Lọc theo danh mục"
          options={categoryOptions}
          onChange={(value) => setCategoryId(value ?? null)}
          style={{ width: 240 }}
        />

        <Button type="primary" onClick={showAddModal}>
          Thêm món ăn
        </Button>
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Spinner color="37baff" />
          </div>
        )}

        <MenuTable
          menus={menus}
          handleDeleteMenu={handleDeleteMenu}
          isLoadingDelete={deleteMutation.isPending}
          showUpdateModal={showUpdateModal}
        />
      </div>

      {/* Modal add menu */}
      <AddMenuModal
        isOpen={isOpenAddModal}
        handleSubmit={handleSubmitAddModal}
        handleCancel={handleCancleAddModal}
        categoryOptions={categoryOptions}
        loading={addMenuMutation.isPending}
      />

      <UpdateMenuModal
        isOpen={isOpenUpdateModal}
        menu={menuUpdate}
        categoryOptions={categoryOptions}
        handleSubmit={handleSubmitUpdateModal}
        handleCancel={handleCancleUpdateModal}
        loading={updateMutation.isPending}
      />
    </div>
  );
};

export default AdminMenuRoute;
