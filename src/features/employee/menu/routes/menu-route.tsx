import { useParams } from "react-router-dom";
import { useMenu } from "../hooks/useMenu";
import { LoaderCircle } from "lucide-react";
import type { MenuDTO, MenuType } from "../types/menu.type";
import MenuCard from "../components/MenuCard";
import { useAddItem } from "../hooks/useAddItem";
import { useMenuStatusSocket } from "../hooks/useMenuStatusSocket";

const MenuRoute = () => {
  // Nhận params categoryId
  const { categoryId } = useParams<{ categoryId: string }>();

  if (!categoryId) {
    throw new Error("categoryId is required");
  }

  // Gọi API lấy danh sách menu dựa theo categoryId
  const { data, isLoading, isError } = useMenu({ categoryId });
  const menus = data?.data || [];

  // Hook gọi api thêm menu vào order
  const addItemMutation = useAddItem();

  useMenuStatusSocket();

  // Thêm món ăn vào đơn hàng
  const handleAddMenu = async (menu: MenuDTO) => {
    if (!menu.orderId) return;
    await addItemMutation.mutate(menu);
  };

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

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-150">
        Không thể tải dữ liệu món ăn
      </div>
    );
  }

  return (
    <div className="px-5">
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menus.map((menu: MenuType) => (
          <MenuCard key={menu._id} {...menu} handleAddMenu={handleAddMenu} />
        ))}
      </div>
    </div>
  );
};

export default MenuRoute;
