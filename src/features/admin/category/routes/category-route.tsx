import { Button } from "antd";
import Spinner from "../../../../components/Spinner";
import CategoryTable from "../components/CategoryTable";
import { useAdminCategory } from "../../hooks/useAdminCategory";
import { useState } from "react";
import CategoryModal from "../components/CategoryModal";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "../hooks/useCategoryMutation";

const CategoryRoute = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);

  const [categoryUpdateId, setCategoryUpdateId] = useState<string>("");
  const [categoryNameUpdate, setCategoryNameUpdate] = useState<string>("");

  // gọi hook lấy danh sách categories
  const { data, isLoading, isError } = useAdminCategory();
  const categories = data?.data || [];

  // hook gọi api thêm danh mục
  const mutation = useAddCategoryMutation();

  // hook gọi api cập nhật danh mục
  const mutationUpdate = useUpdateCategoryMutation();

  const showAddModal = () => {
    setIsOpenAddModal(true);
  };

  const handleSubmit = (categoryName: string) => {
    mutation.mutate(categoryName);
    setIsOpenAddModal(false);
  };

  const handleCancel = () => {
    setIsOpenAddModal(false);
  };

  if (mutation.isError) {
    alert("Lỗi khi thêm danh mục");
  }

  const showUpdateModal = (_id: string, categoryName: string) => {
    setIsOpenUpdateModal(true);
    setCategoryUpdateId(_id);
    setCategoryNameUpdate(categoryName);
  };

  const handleUpdate = (categoryName: string) => {
    mutationUpdate.mutate({
      _id: categoryUpdateId,
      categoryName,
    });
    setIsOpenUpdateModal(false);
    setCategoryUpdateId("");
    setCategoryNameUpdate("");
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
      />

      {/* Modal cập nhật danh mục */}
      <CategoryModal
        isOpen={isOpenUpdateModal}
        handleSubmit={handleUpdate}
        handleCancel={handleCancelUpdate}
        mode="update"
        categoryName={categoryNameUpdate}
      />
    </div>
  );
};

export default CategoryRoute;
