import formatCurrency from "../../../../utils/formatCurrency";
import { useUpdateMenuStatus } from "../hooks/useUpdateMenuStatus";
import type { Menu } from "../types/menu";

const MenuCard = (menu: Menu) => {
  // Gọi api tắt - bật món ăn
  const updateMenuStatusMutate = useUpdateMenuStatus();

  // Tắt - bật món ăn
  const handleUpdateStatus = (menuId: string) => {
    updateMenuStatusMutate.mutate(menuId);
  };

  return (
    <div className="flex flex-col bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
      {/* Ảnh */}
      <img
        src={menu.image}
        alt={"menu-image"}
        className="h-56 w-full object-cover"
      />

      {/* Nội dung */}
      <div className="flex flex-col gap-2 px-4 py-3">
        {/* tên */}
        <p className="text-lg font-semibold text-gray-800">{menu.name}</p>

        {/* giá */}
        <p className="text-red-600 font-semibold text-md">
          {formatCurrency(menu.price)}
        </p>

        {/* trạng thái */}
        <div className="flex justify-between items-center mt-2">
          {menu.status ? (
            <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 rounded-full">
              Đang bán
            </span>
          ) : (
            <span className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-600 rounded-full">
              Tạm tắt
            </span>
          )}

          {/* nút bật tắt */}
          <button
            disabled={updateMenuStatusMutate.isPending}
            onClick={() => handleUpdateStatus(menu._id)}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition flex items-center justify-center gap-2
  ${updateMenuStatusMutate.isPending ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
  ${
    menu.status
      ? "bg-red-500 text-white hover:bg-red-600"
      : "bg-green-500 text-white hover:bg-green-600"
  }`}
          >
            {
            updateMenuStatusMutate.isPending && (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}

            {menu.status ? "Tắt món" : "Bật món"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
