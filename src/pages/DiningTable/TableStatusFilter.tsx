import type { TableStatus } from "../../types/dining-table.type";

const TableStatusFilter = ({
  status,
  setStatus,
}: {
  status: TableStatus;
  setStatus: React.Dispatch<React.SetStateAction<TableStatus>>;
}) => {
  const tableStatus = [
    { label: "All", value: null },
    { label: "Available", value: true },
    { label: "Occupied", value: false },
  ];

  return (
    <div className="flex md:flex-row flex-col md:items-center justify-center md:justify-between">
      <div className="flex items-center justify-around gap-3 py-1 px-2 border border-gray-300 rounded-xl shadow-sm bg-white">
        {tableStatus.map((item) => {
          const isActive = status === item.value;

          return (
            <button
              type="button"
              key={item.label}
              onClick={() => setStatus(item.value as TableStatus)}
              className={
                isActive
                  ? "bg-red-500 text-white px-3 py-2 rounded-xl cursor-pointer font-medium"
                  : "bg-white text-gray-500 px-3 py-2 cursor-pointer font-medium"
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-4 mt-3 md:mt-0">
        {/* Available */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
          <span>Available</span>
        </div>

        {/* Occupied */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
};

export default TableStatusFilter;
