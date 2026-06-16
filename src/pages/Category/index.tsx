import { useState } from "react";
import { useCategories } from "../../hooks/category/useCategories";
import { Button } from "antd";
import Spinner from "../../components/Spinner";
import { useAddCategory } from "../../hooks/category/useAddCategory";
import { useUpdateCategory } from "../../hooks/category/useUpdateCategory";
import CategoryTable from "./CategoryTable";
import CategoryModal from "./CategoryModal";

export const CategoryPage = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);

  const [categoryUpdateId, setCategoryUpdateId] = useState<string>("");
  const [categoryNameUpdate, setCategoryNameUpdate] = useState<string>("");

  // gọi hook lấy danh sách categories
  const { data, isLoading, isError } = useCategories();
  const categories = data?.data || [];

  // hook gọi api thêm danh mục
  const mutation = useAddCategory();

  // hook gọi api cập nhật danh mục
  const mutationUpdate = useUpdateCategory();

  const showAddModal = () => {
    setIsOpenAddModal(true);
  };

  const handleSubmit = (categoryName: string) => {
    mutation.mutate(
      {
        categoryName,
      },
      {
        onSuccess: () => {
          setIsOpenAddModal(false);
        },
      },
    );
  };

  const handleCancel = () => {
    setIsOpenAddModal(false);
  };

  const showUpdateModal = (_id: string, categoryName: string) => {
    setIsOpenUpdateModal(true);
    setCategoryUpdateId(_id);
    setCategoryNameUpdate(categoryName);
  };

  const handleUpdate = (categoryName: string) => {
    mutationUpdate.mutate(
      {
        categoryId: categoryUpdateId,
        categoryName,
      },
      {
        onSuccess: () => {
          setIsOpenUpdateModal(false);
          setCategoryUpdateId("");
          setCategoryNameUpdate("");
        },
      },
    );
  };

  const handleCancelUpdate = () => {
    setIsOpenUpdateModal(false);
  };

  return (
    <div className="px-5 mt-5">
      {isError && <div>Error</div>}

      {/* Button thêm danh mục */}
      <div className="flex justify-end mb-3">
        <Button type="primary" className="py-3" onClick={showAddModal}>
          Thêm danh mục
        </Button>
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Spinner color="37baff" />
          </div>
        )}

        <CategoryTable
          categories={categories}
          showUpdateModal={showUpdateModal}
        />
      </div>

      {/* Modal thêm danh mục */}
      <CategoryModal
        isOpen={isOpenAddModal}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        mode="add"
        loading={mutation.isPending}
      />

      {/* Modal cập nhật danh mục */}
      <CategoryModal
        isOpen={isOpenUpdateModal}
        handleSubmit={handleUpdate}
        handleCancel={handleCancelUpdate}
        mode="update"
        categoryName={categoryNameUpdate}
        loading={mutationUpdate.isPending}
      />
    </div>
  );
};
