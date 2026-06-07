import TableCard from "../features/employee/dineTable/components/TableCard";
import TableStatusFilter from "../features/employee/dineTable/components/TableStatusFilter";
import type { DiningTable } from "../features/employee/dineTable/types/dine.table.type";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import type { TableStatus } from "../features/employee/dineTable/types/tableStatus";
import { useDiningTable } from "../features/employee/dineTable/hooks/useDiningTable";

const HomePage = () => {
  const [status, setStatus] = useState<TableStatus>("all");

  // gọi api fetch danh sách diningtables
  const { data, isLoading, isError } = useDiningTable(status);
  const tables = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-150">
        <LoaderCircle
          color="red"
          className="animate-spin"
          size={45}
          strokeWidth={2}
        />
      </div>
    );
  }

  return (
    <div className="mt-8 px-5">
      <TableStatusFilter status={status} setStatus={setStatus} />

      {isError && (
        <div className="flex justify-center items-center">
          <p className="text-red">Không thể lấy dữ liệu bàn ăn</p>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {tables.map((table: DiningTable) => (
          <TableCard
            key={table._id}
            tableName={table.tableName}
            seats={table.quantity}
            status={table.status}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
