import { Plus, Loader2 } from "lucide-react";
import { useDiningTable } from "../../../hooks/DiningTable/useDiningTable";
import { useEffect, useState, useMemo } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import type { DiningTableResponse } from "../../../types/dining-table.type";
import DiningTableCard from "./DiningTableCard";
import { useUpdatePosition } from "../../../hooks/DiningTable/useUpdatePosition";
import { AddDiningTableModal } from "./AddDiningTableModal";
import { UpdateDiningTableModal } from "./UpdateDiningTableModal";

export const AdminDiningTablePage = () => {
  // Hook lấy danh sách bàn ăn
  const { data, isLoading } = useDiningTable(null);
  const diningTables = useMemo(() => data?.data?.content || [], [data]);

  // Hook api cập nhật vị trí bàn ăn
  const updatePositionMutation = useUpdatePosition();

  const [tables, setTables] = useState<DiningTableResponse[]>([]);
  const [previousTables, setPreviousTables] = useState<DiningTableResponse[]>(
    [],
  );

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] =
    useState<DiningTableResponse | null>(null);

  useEffect(() => {
    setTables(diningTables);
  }, [diningTables]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    const oldIndex = tables.findIndex(
      (item) => item.diningTableId === active.id,
    );

    const newIndex = tables.findIndex((item) => item.diningTableId === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    // Lưu trạng thái cũ để rollback nếu cần
    setPreviousTables(tables);

    const updatedTables = arrayMove(tables, oldIndex, newIndex);

    // Optimistic update - cập nhật UI ngay
    setTables(updatedTables);

    const movedTable = updatedTables[newIndex];

    const previousTable = updatedTables[newIndex - 1];

    const nextTable = updatedTables[newIndex + 1];

    // Gọi api cập nhật vị trí
    updatePositionMutation.mutate(
      {
        diningTableId: movedTable?.diningTableId,
        previousTableId: previousTable?.diningTableId ?? null,
        nextTableId: nextTable?.diningTableId ?? null,
      },
      {
        onError: () => {
          // Rollback nếu api thất bại
          setTables(previousTables);
        },
      },
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Loader2 size={48} className="text-blue-500 animate-spin" />
            </div>
            <p className="text-gray-600 font-medium">
              Đang tải danh sách bàn ăn...
            </p>
          </div>
        </div>
      );
    }

    if (tables.length === 0) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-500 font-medium mb-4">Chưa có bàn ăn nào</p>
            <button
              className="
                px-6 py-2.5
                bg-blue-500 text-white
                rounded-lg
                hover:bg-blue-600
                transition-colors
                font-medium
              "
            >
              Tạo bàn ăn đầu tiên
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={tables.map((table) => table.diningTableId)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {tables.map((table, index) => (
                <div
                  key={table.diningTableId}
                  className="flex items-center gap-3"
                >
                  <span className="text-xs font-semibold text-gray-400 w-6 text-center">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <DiningTableCard
                      table={table}
                      onEdit={(table) => {
                        setSelectedTable(table);
                        setIsUpdateModalOpen(true);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* LOADING INDICATOR */}
        {updatePositionMutation.isPending && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
              <Loader2 size={16} className="text-blue-500 animate-spin" />
              <span className="text-sm font-medium text-gray-700">
                Đang cập nhật vị trí...
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="px-6 py-6 bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Quản lý bàn ăn
          </h1>
          <p className="text-gray-600">Kéo và thả để sắp xếp vị trí các bàn</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="
            flex items-center gap-2
            px-6 py-3
            bg-linear-to-r
            from-blue-500
            to-blue-600
            text-white
            rounded-lg
            shadow-md
            hover:shadow-lg
            hover:from-blue-600
            hover:to-blue-700
            transition-all
            font-medium
            active:scale-95
          "
        >
          <Plus size={20} />
          <span>Thêm bàn ăn</span>
        </button>
      </div>

      {/* CONTENT */}
      {renderContent()}

      {/* MODALS */}
      <AddDiningTableModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <UpdateDiningTableModal
        open={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedTable(null);
        }}
        diningTable={selectedTable}
      />
    </div>
  );
};
