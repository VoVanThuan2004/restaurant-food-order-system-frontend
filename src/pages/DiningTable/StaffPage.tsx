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
  
    // gọi api fetch danh sách diningtables
    const { data, isLoading, isError } = useDiningTable(status);
    const tables = data?.data?.content || [];
  
    useDiningTableSocket();
  
    return (
      <div className="mt-8 px-5">
        <TableStatusFilter status={status} setStatus={setStatus} />
  
        {isError && (
          <div className="flex justify-center items-center">
            <p className="text-red">Không thể lấy dữ liệu bàn ăn</p>
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
      </div>
    );
};
