import type { OrderItemType } from "../types/order-item";
import { NotebookPen } from "lucide-react";
import ItemStatusSelect from "./ItemStatusSelect";
import type { ItemStatus } from "../constants/item-status";
import { useConfirmItem } from "../hooks/useConfirmItem";

type Props = {
  item: OrderItemType;
};

const OrderItem = (props: Props) => {

  // Gọi hook api xác nhận trạng thái món ăn
  const useConfirmItemMutate = useConfirmItem();

  const handleChangeStatus = () => {
    useConfirmItemMutate.mutate(props.item._id);
  }

  return (
    <div className="flex gap-4">
      {/* Ảnh món ăn */}
      <img
        src={props.item.menuImage}
        alt="item"
        className="w-15 h-15 object-cover rounded-md"
      />

      <div className="flex-1 flex flex-col gap-2">
        {/* Tên món + số lượng */}
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
            {props.item.menuName}
          </h2>

          <div className="flex items-center justify-center min-w-[36px] h-7 px-2 text-xs font-semibold text-red-600 bg-red-100 rounded-md">
            x{props.item.quantity}
          </div>
        </div>

        {/* Ghi chú */}
        {props.item.notes && (
          <div className="flex items-start gap-1.5 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-200">
            <NotebookPen className="text-yellow-600 mt-[1px]" size={16} />
            <p className="text-xs text-yellow-700 leading-snug">
              {props.item.notes}
            </p>
          </div>
        )}

        {/* Status */}
        <ItemStatusSelect
          status={props.item.currentStatus as ItemStatus}
          onChange={() => handleChangeStatus()}
        />
      </div>
    </div>
  );
};

export default OrderItem;
