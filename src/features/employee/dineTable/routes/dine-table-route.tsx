import { useState } from "react";
import { useDiningTable } from "../hooks/useDiningTable";
import TableStatusFilter from "../components/TableStatusFilter";
import type { DiningTable } from "../types/dine.table.type";
import TableCard from "../components/TableCard";
import Spinner from "../../../../components/Spinner";
import { useDiningTableSocket } from "../hooks/useDiningTableSocket";
import type { TableStatus } from "../types/tableStatus";

const DineTableRoute = () => {
  const [status, setStatus] = useState<TableStatus>("all");

  // gọi api fetch danh sách diningtables
  const { data, isLoading, isError } = useDiningTable(status);
  const tables = data?.data || [];

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
        {tables.map((table: DiningTable) => (
          <TableCard
            key={table._id}
            _id={table._id}
            tableName={table.tableName}
            seats={table.quantity}
            status={table.status}
          />
        ))}
      </div>
    </div>
  );
};

export default DineTableRoute;
