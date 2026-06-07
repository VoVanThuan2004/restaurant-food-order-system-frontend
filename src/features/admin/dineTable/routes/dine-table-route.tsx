import { Button } from "antd";
import DineTable from "../components/DineTable";
import { useGetDineTables } from "../hooks/useGetDineTables";
import Spinner from "../../../../components/Spinner";
import DineTableAddModal from "../components/DineTableAddModal";
import { useState } from "react";
import type { DineTableDTO, DineTableUpdateDTO } from "../types/dine-table";
import { useAddDineTableMutation } from "../hooks/useAddDineTableMutation";
import { useUpdateDineTableMutation } from "../hooks/useUpdateDineTableMutation";
import DineTableUpdateModal from "../components/DineTableUpdateModal";
import { useDeleteDineTableMutation } from "../hooks/useDeleteDineTableMutation";

const AdminDineTableRoute = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [dineTableId, setDineTableId] = useState<string>("");
  const [dineTableUpdate, setDineTableUpdate] = useState<DineTableUpdateDTO>({
    tableName: "",
    quantity: 0,
  });

  const { data, isLoading, isError } = useGetDineTables();
  const dineTables = data?.data || [];

  // Gọi api thêm bàn ăn
  const addDineTableMutate = useAddDineTableMutation({
    onDone: () => setIsOpenAddModal(false),
  });

  // Gọi api cập nhật món ăn
  const updateDineTableMutate = useUpdateDineTableMutation({
    onDone: () => setIsOpenUpdateModal(false),
  });

  // Gọi api xóa món ăn
  const deleteDineTableMutate = useDeleteDineTableMutation();

  const showAddModal = () => {
    setIsOpenAddModal(true);
  };

  const handleSubmitAddModal = (dineTabe: DineTableDTO) => {
    addDineTableMutate.mutate(dineTabe);
  };

  const handleCancelAddModal = () => {
    setIsOpenAddModal(false);
  };

  // === Cập nhật thông tin bàn ăn ===
  const showUpdateModal = (
    dineTableId: string,
    dineTable: DineTableUpdateDTO,
  ) => {
    setDineTableId(dineTableId);
    setDineTableUpdate(dineTable);
    setIsOpenUpdateModal(true);
  };

  const handleSubmitUpdate = (dineTable: DineTableUpdateDTO) => {
    updateDineTableMutate.mutate({
      dineTableId: dineTableId,
      tableName: dineTable.tableName,
      quantity: dineTable.quantity,
    });
  };

  const handleCancel = () => {
    setIsOpenUpdateModal(false);
  };

  // === Xóa bàn ăn ===
  const handleDeleteDineTable = (dineTableId: string) => {
    deleteDineTableMutate.mutate(dineTableId);
  };

  

  return (
    <div className="px-5 mt-5">
      {isError && <p>Lỗi khi tải dữ liệu bàn ăn</p>}

      {/* Button thêm danh mục */}
      <div className="flex justify-end mb-3">
        <Button type="primary" className="py-3" onClick={showAddModal}>
          Thêm bàn ăn
        </Button>
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Spinner color="37baff" />
          </div>
        )}

        <DineTable
          dineTables={dineTables}
          showUpdateModal={showUpdateModal}
          isLoadingDelete={deleteDineTableMutate.isPending}
          handleDelete={handleDeleteDineTable}
        />
      </div>

      <DineTableAddModal
        isOpen={isOpenAddModal}
        isLoading={addDineTableMutate.isPending}
        handleSubmit={handleSubmitAddModal}
        handleCancel={handleCancelAddModal}
      />

      <DineTableUpdateModal
        isOpen={isOpenUpdateModal}
        isLoading={updateDineTableMutate.isPending}
        dineTable={dineTableUpdate}
        handleSubmit={handleSubmitUpdate}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default AdminDineTableRoute;
