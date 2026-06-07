// components/DiningTableCard.tsx

import { Users, MoreVertical, Edit2, Trash2, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { DiningTableResponse } from "../../../types/dining-table.type";
import { useState } from "react";

type Props = {
  table: DiningTableResponse;
  onEdit?: (table: DiningTableResponse) => void;
};

const DiningTableCard = ({ table, onEdit }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: table.diningTableId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-white rounded-xl border transition-all duration-300
        ${
          isDragging
            ? "border-blue-500 shadow-lg shadow-blue-200 ring-2 ring-blue-300"
            : "border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300"
        }
        p-4 group relative
      `}
    >
      <div className="flex items-start gap-3">
        {/* DRAG HANDLE */}
        <div
          {...attributes}
          {...listeners}
          className="
            shrink-0 mt-1
            text-gray-400 group-hover:text-blue-500
            cursor-grab active:cursor-grabbing
            transition-colors
            flex items-center justify-center
            w-6 h-6
            rounded hover:bg-blue-50
          "
          title="Kéo để sắp xếp"
        >
          <GripVertical size={18} />
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 truncate">
            {table.name}
          </h3>

          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Users size={16} />
              <span className="text-sm">{table.capacity} người</span>
            </div>

            <span
              className={`
                px-2.5 py-1 rounded-full text-xs font-medium transition-colors
                ${
                  table.status
                    ? "bg-green-100 text-green-700 group-hover:bg-green-200"
                    : "bg-red-100 text-red-700 group-hover:bg-red-200"
                }
              `}
            >
              {table.status ? "Hoạt động" : "Đã khóa"}
            </span>
          </div>
        </div>

        {/* ACTION MENU */}
        <div className="shrink-0 relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="
              p-2 rounded-lg text-gray-400 hover:text-gray-600
              hover:bg-gray-100 transition-all
              opacity-0 group-hover:opacity-100
              focus:opacity-100 focus:outline-none focus:bg-gray-100
            "
            title="Tùy chọn"
          >
            <MoreVertical size={18} />
          </button>

          {/* DROPDOWN MENU */}
          {showMenu && (
            <div
              className="
                absolute right-0 top-full mt-1 z-20
                bg-white rounded-lg shadow-lg border border-gray-200
                overflow-hidden
              "
              onMouseLeave={() => setShowMenu(false)}
              role="menu"
            >
              <button
                onClick={() => {
                  setShowMenu(false);
                  onEdit?.(table);
                }}
                className="
                  w-full px-4 py-2.5 text-sm font-medium
                  text-gray-700 hover:bg-blue-50
                  flex items-center gap-2
                  transition-colors
                "
                role="menuitem"
              >
                <Edit2 size={16} />
                Chỉnh sửa
              </button>

              <div className="border-t border-gray-100"></div>

              <button
                className="
                  w-full px-4 py-2.5 text-sm font-medium
                  text-red-600 hover:bg-red-50
                  flex items-center gap-2
                  transition-colors
                "
                role="menuitem"
              >
                <Trash2 size={16} />
                Xóa
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiningTableCard;
