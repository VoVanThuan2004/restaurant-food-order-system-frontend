import { useState } from "react";
import type { DiningTableResponse, TableStatus } from "../../types/dining-table.type";
import { useDiningTable } from "../../hooks/DiningTable/useDiningTable";
import TableStatusFilter from "./TableStatusFilter";
import Spinner from "../../components/Spinner";
import TableCard from "./TableCard";
import { useDiningTableSocket } from "../../hooks/DiningTable/useDiningTableSocket";
import useAuthStore from "../../stores/useAuthStore";

export const StaffPage = () => {
  const userId = useAuthStore((state) => state.user?.userId);
  const [status, setStatus] = useState<TableStatus>(null);
  
    // Lấy danh sách bàn theo trạng thái đang chọn.
    const { data, isLoading, isError } = useDiningTable(status);
    const tables = data?.data?.content || [];
  
    useDiningTableSocket();
  
    return (
      <div className="mx-auto mt-6 w-full max-w-screen-2xl px-4 sm:mt-8 sm:px-6">
        <TableStatusFilter status={status} setStatus={setStatus} />
  
        {isError && (
          <div className="flex justify-center items-center">
            <p className="text-red-600">Không thể tải danh sách bàn ăn. Vui lòng thử lại.</p>
          </div>
        )}
  
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <Spinner color="#fb2c36" />
          </div>
        )}
  
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {tables.map((table: DiningTableResponse) => (
            <TableCard
              key={table.diningTableId}
              diningTableId={table.diningTableId}
              name={table.name}
              capacity={table.capacity}
              status={table.status}
              userId={userId as string}
            />
          ))}
        </div>
        {!isLoading && !isError && tables.length === 0 && (
          <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-10 text-center">
            <p className="font-medium text-gray-700">Không tìm thấy bàn phù hợp</p>
            <p className="mt-1 text-sm text-gray-500">Thử chọn trạng thái khác để xem danh sách bàn.</p>
          </div>
        )}
      </div>
    );
};
